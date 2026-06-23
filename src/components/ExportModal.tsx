import { X, Gauge, FileVideo, Loader2, HardDrive, Video } from "lucide-react";
import { useState } from "react";

interface ExportModalProps {
  defaultFps: number;
  isClosing?: boolean;
  onClose: () => void;
  onExport: (options: ExportOptions) => void;
  isExporting: boolean;
  isEncoding: boolean;
  progress: number | null;
  frameCount?: number;
}

export interface ExportOptions {
  fps: number;
  format: "mp4" | "webm" | "gif";
  bitrate: number;
  quality: "balanced" | "quality" | "realtime";
}

export default function ExportModal({
  defaultFps,
  isClosing = false,
  onClose,
  onExport,
  isExporting,
  isEncoding,
  progress,
  frameCount = 0,
}: ExportModalProps) {
  const [fps, setFps] = useState(defaultFps);
  const [format, setFormat] = useState<"mp4" | "webm" | "gif">("mp4");
  const [bitrate, setBitrate] = useState(10);
  const [quality, setQuality] = useState<"balanced" | "quality" | "realtime">(
    "quality",
  );

  const isRecording = isExporting && !isEncoding;

  return (
    <div
      className={`modal-overlay ${isClosing ? "is-closing" : ""}`}
      onClick={isExporting || isEncoding ? undefined : onClose}
    >
      <div
        className="modal-content export-modal"
        style={{ width: "400px", maxWidth: "400px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>
            {isRecording ? "Recording..." : isEncoding ? "Exporting..." : "Export Video"}
          </h2>
          {!isExporting && !isEncoding && (
            <button className="close-modal-btn" onClick={onClose}>
              <X size={18} />
            </button>
          )}
        </div>
        <div className="modal-body settings-modal-body">
          {!isExporting && !isEncoding && (
            <>
              <div className="export-warning">
                The exporting process is highly unstable at the moment. Please report any bugs you find to us through Discord!
              </div>
              <section className="settings-section">
                <div className="settings-section-title">
                  <Gauge size={16} />
                  <span>Capture Settings</span>
                </div>
                <div className="settings-row">
                  <span className="settings-label">Frame Rate (FPS)</span>
                  <input
                    className="settings-input"
                    type="number"
                    min={1}
                    max={60}
                    value={fps}
                    onChange={(e) =>
                      setFps(parseInt(e.target.value, 10) || defaultFps)
                    }
                  />
                </div>
                <div className="settings-row">
                  <span className="settings-label">Format</span>
                  <select
                    className="settings-select"
                    value={format}
                    onChange={(e) => setFormat(e.target.value as any)}
                  >
                    <option value="mp4">MP4 (H.264)</option>
                    <option value="webm">WebM (VP9)</option>
                    <option value="gif">GIF (Animated)</option>
                  </select>
                </div>
              </section>

              <section className="settings-section">
                <div className="settings-section-title">
                  <HardDrive size={16} />
                  <span>Quality Settings</span>
                </div>
                <div className="settings-row">
                  <span className="settings-label">Bitrate (Mbps)</span>
                  <input
                    className="settings-input"
                    type="number"
                    min={1}
                    max={50}
                    value={bitrate}
                    disabled={format === "gif"}
                    onChange={(e) =>
                      setBitrate(parseInt(e.target.value, 10) || 10)
                    }
                  />
                </div>
                <div className="settings-row">
                  <span className="settings-label">Strategy</span>
                  <select
                    className="settings-select"
                    value={quality}
                    onChange={(e) => setQuality(e.target.value as any)}
                  >
                    <option value="quality">High Quality</option>
                    <option value="balanced">Balanced</option>
                    <option value="realtime">Fast Encoding</option>
                  </select>
                </div>
              </section>
            </>
          )}

          {isRecording && (
            <div className="export-encoding-body">
              <div className="export-encoding-icon">
                <Video size={28} />
              </div>
              <div className="export-encoding-label">
                {frameCount > 0 ? `${frameCount} frame${frameCount === 1 ? "" : "s"} captured` : "Starting..."}
              </div>
              <div className="export-encoding-sublabel">
                Recording in background, do not close this window...
              </div>
            </div>
          )}

          {isEncoding && (
            <div className="export-encoding-body">
              <div className="export-encoding-icon">
                <Loader2 className="animate-spin-slow" size={28} />
              </div>
              <div className="export-encoding-label">
                {progress !== null
                  ? `${Math.round(progress)}%`
                  : "Processing chunks..."}
              </div>
              <div className="export-encoding-sublabel">
                {progress !== null && progress < 100
                  ? "Encoding video, do not close this window..."
                  : "Finalizing file..."}
              </div>
              <div className="export-progress-container">
                <div className="export-progress-bar">
                  <div
                    className="export-progress-fill"
                    style={{ width: `${progress ?? 0}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="modal-footer">
            {!isExporting && !isEncoding && (
              <button
                className="primary-btn"
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
                onClick={() =>
                  onExport({
                    fps,
                    format,
                    bitrate: bitrate * 1_000_000,
                    quality,
                  })
                }
              >
                <FileVideo size={18} />
                Export
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}