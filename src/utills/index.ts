/**
 * 格式化文件大小（二进制 1024 进制）
 * @param {number} bytes 字节数
 * @param {number} decimals 保留的小数位数，默认 2
 * @returns {string} 带单位的大小字符串，例如 "1.23 MB"
 */
import {saveAs} from "file-saver";

function formatFileSize(bytes, decimals = 2) {
  if (bytes === 0) return '0 B';
  if (bytes < 0) return 'Invalid size';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);

  // 处理小数位
  const formatted = value.toFixed(decimals);
  // 去除末尾无意义的 .00（可选）
  const finalValue = formatted.endsWith('.00') ? parseInt(formatted) : formatted;
  return `${finalValue} ${sizes[i]}`;
}

/**
 * 下载文件
 */
function downloadFile(url, fileName) {
  if (!url) {
    return;
  }
  saveAs(url, fileName);
}

export {
  formatFileSize,
  downloadFile
}
