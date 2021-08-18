/**
 * convert bytes into the right unit
 * @param bytes - file size
 * @returns {string} - file size with the right unit (Kb, Mb...)
 */
const bytesToSize = (bytes) => {
    const sizes = ['b', 'Kb', 'Mb', 'Gb', 'Tb']
    if (bytes === 0) return '0 Byte'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

export default bytesToSize;