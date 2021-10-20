function previewFile(file) {
    // 追加先
    const previewArea = document.getElementById('preview');

    // キャンバスの準備
    var ctx = previewArea.getContext("2d");

    // FileRenderオブジェクトを作成
    const reader = new FileReader();

    // URLとして読み込まれたとき実行
    reader.onload = function(e) {
        const imageUrl = e.target.result;
        const img = document.createElement("img");
        img.src = imageUrl;
    }

    // ファイル読み込み
    reader.readAsDataURL(file);

    // Imageに変換
    const image = new Image();
    var image_data = ctx.createImageData(256, 256);
    reader.onloadend = function() {
        image.src = reader.result;
        image.onload = () => {
            previewArea.width = image.width;
            previewArea.height = image.height;
            ctx.drawImage(image, 0, 0);
            
            // 読み込んだ画像からImageDataを取得
            console.log(ctx.width);
            console.log(parseInt(ctx.width));
            image_data = ctx.getImageData(0, 0, image.width, image.height);
        }
    }

    // previewAreaがクリックされた時の処理
    previewArea.onclick = function(e) {
        var x = e.offsetX;	// 水平の位置座標
        var y = e.offsetY;	// 垂直の位置座標
    
        console.log(x+","+y);
        console.log(image_data.width+","+image_data.height);

        // クリックされた座標のRGB値を取得
        var index = (x + y * image.width) * 4;
        var r = image_data.data[index];
        var g = image_data.data[index + 1];
        var b = image_data.data[index + 2];

        console.log(r+","+g+","+b);
    }
}