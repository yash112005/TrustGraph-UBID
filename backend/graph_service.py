from neo4j import GraphDatabase
import os

NEO4J_URI = os.getenv("NEO4J_URI", "bolt://localhost:7687")
NEO4J_USER = os.getenv("NEO4J_USER", "neo4j")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD", "password")

class GraphService:
    def __init__(self):
        self.driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

    def close(self):
        self.driver.close()

    def add_record_node(self, record_id: int, name: str):
        with self.driver.session() as session:
            session.run("MERGE (r:Record {id: $id, name: $name})", id=record_id, name=name)

    def add_match_edge(self, id1: int, id2: int, score: float):
        with self.driver.session() as session:
            session.run("""
                MATCH (r1:Record {id: $id1})
                MATCH (r2:Record {id: $id2})
                MERGE (r1)-[m:MATCHES {score: $score}]-(r2)
            """, id1=id1, id2=id2, score=score)

    def get_clusters(self):
        """
        Uses Neo4j's connected components (simulated or via GDS) to find clusters.
        For a prototype, we can use a simpler query to find connected components.
        """
        query = """
        CALL gds.wcc.stream({
          nodeProjection: 'Record',
          relationshipProjection: 'MATCHES'
        })
        YIELD nodeId, componentId
        RETURN gds.util.asNode(nodeId).id AS record_id, componentId AS cluster_id
        """
        # Note: Requires GDS plugin. Fallback to basic Cypher if GDS not available.
        fallback_query = """
        MATCH (r:Record)
        OPTIONAL MATCH (r)-[:MATCHES*]-(other)
        WITH r, collect(DISTINCT other.id) + r.id AS component
        RETURN r.id AS record_id, head(sort(component)) AS cluster_id
        """
        with self.driver.session() as session:
            result = session.run(fallback_query)
            return [dict(record) for record in result]
            
    def clear_graph(self):
        with self.driver.session() as session:
            session.run("MATCH (n) DETACH DELETE n")
