import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export function exportToExcel (fliename, dom, that) {
  const XLSX = require('xlsx')
  console.log('XLSX', XLSX, FileSaver)
  // 使用 this.$nextTick 是在dom元素都渲染完成之后再执行document.querySelector('#oIncomTable')
  that.$nextTick(function () {
    // 设置导出的内容是否只做解析，不进行格式转换     false：要解析， true:不解析
    const xlsxParam = { raw: true }
    const wb = XLSX.utils.table_to_book(dom, xlsxParam)
    // 导出excel文件名
    let fileName = fliename + new Date().getTime() + '.xlsx'

    const wbout = XLSX.write(wb, {
      bookType: 'xlsx',
      bookSST: true,
      type: 'array',
    })
    try {
      // 下载保存文件
      FileSaver.saveAs(
        new Blob([wbout], { type: 'application/octet-stream' }),
        fileName
      )
    } catch (e) {
      if (typeof console !== 'undefined') {
        console.log(e, wbout)
      }
    }
    return wbout
  })
}
