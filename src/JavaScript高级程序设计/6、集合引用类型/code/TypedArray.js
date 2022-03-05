// ArrayBuffer
const buf1 = new ArrayBuffer(16);
const buf2 = buf1.slice(4, 12)
console.log(buf2.byteLength)


// DateView

const dataBuf = new ArrayBuffer(256);

const dataView = new DataView(dataBuf);
console.log(dataView.byteOffset);
console.log(dataView.byteLength);
console.log(dataView.buffer === dataBuf);

// 设置 Int8 -128~127
dataView.setInt8(0, 128);
console.log(dataView.getInt8(0))
//
dataView.setUint8(1, 256);
console.log(dataView.getUint8(1))


// 定型数组
let typeArray = new Int32Array(10);
console.log(typeArray.BYTES_PER_ELEMENT); // 每个元素的大小。
console.log(typeArray.length); // 长度
console.log(typeArray.byteLength); // byteLength = length * BYTES_PER_ELEMENT
typeArray[0] = 10; // 设置值


// set subarray

let typeArray2 = new Int32Array(10);
console.log(typeArray2)
typeArray2.set(new Int32Array([1, 2, 3, 4]), 2)
console.log(typeArray2)

console.log(typeArray2.subarray(3, 9))


