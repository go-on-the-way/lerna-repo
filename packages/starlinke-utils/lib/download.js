
// 替换请求协议为本站相同的协议
function getSameProtocol(url) {
  if (!url) {
    return url
  }
  return url.replace(/^(http|https)/, window.location.protocol.split(':')[0])
}

/**
* 下载文件
* @param {file} file 要下载的文件
* @param {fileName} fileName  要下载的文件名
*/
export const downloadFile = (file, fileName) => {
  let link = document.createElement('a')
  link.download = fileName
  link.href = getSameProtocol(file)
  link.style.display = 'hidden'
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}


/**
 * 下载blob格式的文件
 * @param {blobData} blobData blob格式的数据源
 * @param {fileName} fileName 导出的文件名
 */
export const downloadBlobData = (blobData, fileName) => {
  let url = window.URL.createObjectURL(blobData)
  downloadFile(url, fileName)
  window.URL.revokeObjectURL(url)
}
