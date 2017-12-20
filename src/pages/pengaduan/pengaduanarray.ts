export class PengaduanArray {
    constructor(
        public id:Number,public tanggal:Date,
        public judul:String,public id_kategoripengaduan:Number,
        public id_warga:Number,public id_dusun:Number,
        public deskripsi:Text,public status:Number,
        public longitude:number,public latitude:number,
        public privasipengaduan:Number,public privasiidentitas:Number){}
}
