function previewFile(file) {
    // 追加先
    const previewArea = document.getElementById('preview');
    const appArea = document.getElementById('app-area-id');

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
        // 幅、高さの初期値
        previewArea.width = appArea.width;
        previewArea.height = appArea.height * 0.8;

        console.log("previewArea_width = " + appArea.width);
        console.log("previewArea_height = " + appArea.height);
        
        image.src = reader.result;

        image.onload = () => {
            var canvas_hpw = previewArea.height / previewArea.width;
            var image_hpw = image.height / image.width;

            var resized_image_width;
            var resized_image_height;

            if (image_hpw <= canvas_hpw) {
                resized_image_width  = previewArea.width / image.width * image.height;
                resized_image_height = previewArea.height;
            }
            else {
                resized_image_height = previewArea.height / image.height * image.width;
                resized_image_width  = previewArea.width;
            }
            console.log("resized_image_width = " + resized_image_width);
            console.log("resized_image_height = " + resized_image_height);

            ctx.drawImage(image, 0, 0, resized_image_width, resized_image_height);

            // 読み込んだ画像からImageDataを取得
            console.log(ctx.width);
            console.log(parseInt(ctx.width));
            image_data = ctx.getImageData(0, 0, resized_image_width, resized_image_height);
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