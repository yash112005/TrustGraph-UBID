import React, { useState } from 'react';
import { Upload, FileText, Download, CheckCircle2, AlertCircle, Trash2, History } from 'lucide-react';
import toast from 'react-hot-toast';

const MOCK_HISTORY = [
  { id: 1, file: "q1_tax_records.csv", date: "2024-05-01 14:30", rows: 1250, status: "Success" },
  { id: 2, file: "karnataka_registration_v2.xlsx", date: "2024-04-28 09:15", rows: 4500, status: "Success" },
  { id: 3, file: "bank_txn_mismatch.json", date: "2024-04-25 18:40", rows: 890, status: "Failed" },
];

const PREVIEW_DATA = [
  { ubid: 'UBID-4421', name: 'Alpha Traders', industry: 'Retail', score: 82, errors: 0 },
  { ubid: 'UBID-4422', name: 'Beta Logistics', industry: 'Logistics', score: 45, errors: 1 },
  { ubid: 'UBID-4423', name: 'Gamma Mfg', industry: 'Manufacturing', score: 71, errors: 0 },
  { ubid: 'UBID-4424', name: 'Delta Agri', industry: 'Agriculture', score: 29, errors: 2 },
  { ubid: 'UBID-4425', name: 'Epsilon Tech', industry: 'Technology', score: 95, errors: 0 },
];

const UploadDataPage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setShowPreview(true);
        toast.success('File uploaded and parsed successfully');
      }
    }, 200);
  };

  const handleReset = () => {
    setShowPreview(false);
    setUploadProgress(0);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Upload Data</h2>
        <div style={styles.templates}>
          <button style={styles.templateBtn}><Download size={16} /> CSV Template</button>
          <button style={styles.templateBtn}><Download size={16} /> XLSX Template</button>
        </div>
      </div>

      <div style={styles.uploadArea}>
        {!showPreview ? (
          <div 
            className="glass-card" 
            style={styles.dropZone}
            onClick={() => !isUploading && handleUpload()}
          >
            {isUploading ? (
              <div style={styles.progressWrapper}>
                <div style={styles.progressBar}>
                  <div style={{ ...styles.progressFill, width: `${uploadProgress}%` }} />
                </div>
                <p style={styles.progressText}>Processing file... {uploadProgress}%</p>
              </div>
            ) : (
              <>
                <div style={styles.uploadIcon}>
                  <Upload size={48} color="var(--accent)" />
                </div>
                <h3 style={styles.uploadTitle}>Drag & Drop files here</h3>
                <p style={styles.uploadSubtitle}>Supported formats: CSV, XLSX, JSON (Max 50MB)</p>
                <button style={styles.browseBtn}>Browse Files</button>
              </>
            )}
          </div>
        ) : (
          <div className="glass-card animate-fade-in" style={styles.previewContainer}>
            <div style={styles.previewHeader}>
              <div style={styles.previewTitleGroup}>
                <CheckCircle2 color="var(--success)" size={24} />
                <h3>Upload Preview (first 5 rows)</h3>
              </div>
              <button style={styles.resetBtn} onClick={handleReset}><Trash2 size={18} /> Clear</button>
            </div>
            
            <div style={styles.statsRow}>
              <div style={styles.stat}><b>1250</b> total rows</div>
              <div style={styles.stat}><b>1247</b> valid rows</div>
              <div style={{ ...styles.stat, color: 'var(--danger)' }}><b>3</b> errors found</div>
            </div>

            <table style={styles.table}>
              <thead>
                <tr style={styles.thRow}>
                  <th style={styles.th}>UBID</th>
                  <th style={styles.th}>Business Name</th>
                  <th style={styles.th}>Industry</th>
                  <th style={styles.th}>Score</th>
                  <th style={styles.th}>Issues</th>
                </tr>
              </thead>
              <tbody>
                {PREVIEW_DATA.map((row, i) => (
                  <tr key={i} style={{ ...styles.tr, backgroundColor: row.errors > 0 ? 'rgba(239, 68, 68, 0.05)' : 'transparent' }}>
                    <td style={styles.td}>{row.ubid}</td>
                    <td style={styles.td}>{row.name}</td>
                    <td style={styles.td}>{row.industry}</td>
                    <td style={styles.td}>{row.score}</td>
                    <td style={styles.td}>
                      {row.errors > 0 ? (
                        <span style={styles.errorTag}><AlertCircle size={14} /> {row.errors} Errors</span>
                      ) : (
                        <span style={styles.successTag}>Valid</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={styles.previewFooter}>
              <button style={styles.cancelBtn} onClick={handleReset}>Cancel</button>
              <button style={styles.confirmBtn} onClick={() => { toast.success('Import started'); handleReset(); }}>Confirm Import</button>
            </div>
          </div>
        )}
      </div>

      <div className="glass-card" style={styles.historyCard}>
        <div style={styles.historyHeader}>
          <History size={20} color="var(--text-muted)" />
          <h3>Previous Uploads</h3>
        </div>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th style={styles.th}>Filename</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Rows</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_HISTORY.map(h => (
              <tr key={h.id} style={styles.tr}>
                <td style={styles.td}>
                  <div style={styles.fileLabel}>
                    <FileText size={16} color="var(--accent)" />
                    {h.file}
                  </div>
                </td>
                <td style={styles.td}>{h.date}</td>
                <td style={styles.td}>{h.rows}</td>
                <td style={styles.td}>
                  <span style={{ 
                    ...styles.statusTag, 
                    color: h.status === 'Success' ? 'var(--success)' : 'var(--danger)',
                    backgroundColor: h.status === 'Success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'
                  }}>
                    {h.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
  },
  templates: {
    display: 'flex',
    gap: '12px',
  },
  templateBtn: {
    padding: '8px 16px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--accent)',
    fontSize: '0.85rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '600',
  },
  uploadArea: {
    width: '100%',
  },
  dropZone: {
    height: '300px',
    border: '2px dashed var(--border)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  uploadIcon: {
    marginBottom: '1.5rem',
    opacity: 0.8,
  },
  uploadTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    marginBottom: '8px',
  },
  uploadSubtitle: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    marginBottom: '1.5rem',
  },
  browseBtn: {
    padding: '10px 24px',
    backgroundColor: 'var(--accent)',
    border: 'none',
    borderRadius: '8px',
    color: '#000',
    fontWeight: '700',
    cursor: 'pointer',
  },
  progressWrapper: {
    width: '300px',
    textAlign: 'center',
  },
  progressBar: {
    height: '8px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '4px',
    marginBottom: '12px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'var(--accent)',
    transition: 'width 0.2s',
  },
  progressText: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
  },
  previewContainer: {
    padding: '0',
  },
  previewHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previewTitleGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  resetBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--danger)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.9rem',
  },
  statsRow: {
    padding: '1rem 1.5rem',
    display: 'flex',
    gap: '2rem',
    fontSize: '0.9rem',
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  thRow: {
    borderBottom: '1px solid var(--border)',
  },
  th: {
    textAlign: 'left',
    padding: '12px 1.5rem',
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    fontWeight: '700',
  },
  tr: {
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  td: {
    padding: '16px 1.5rem',
    fontSize: '0.85rem',
  },
  errorTag: {
    color: 'var(--danger)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontWeight: '600',
  },
  successTag: {
    color: 'var(--success)',
    fontWeight: '600',
  },
  previewFooter: {
    padding: '1.5rem',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    borderTop: '1px solid var(--border)',
  },
  cancelBtn: {
    padding: '10px 20px',
    background: 'none',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
  },
  confirmBtn: {
    padding: '10px 20px',
    backgroundColor: 'var(--success)',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontWeight: '700',
    cursor: 'pointer',
  },
  historyCard: {
    padding: '0',
  },
  historyHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  fileLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  statusTag: {
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '700',
  }
};

export default UploadDataPage;
