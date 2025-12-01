
        const GRID_SIZE = 10; // 縦横のマス目数
        const CANVAS_KEY = 'my_pixel_art_data'; // localStorageに保存するときのキー名

        // 描画に使う色の定義 (配列)
        const COLORS = [
            'white', // 白 (COLORS[0])
            'black', // 黒 (COLORS[1])
            'red', // 赤
            'blue', // 青
            'green', // 緑
            'yellow', // 黄
            'magenta', // マゼンタ
            'cyan', // シアン
        ];

        let selectedColor = COLORS[1]; //初期選択色は黒

    

        function paintCell(cell) {
            cell.style.backgroundColor = selectedColor;
        }

        function saveArt() {
            const cells = document.getElementById('canvas').querySelectorAll('.cell');
            const artData = [];

            for (let i = 0; i < cells.length; i++) {
                artData.push(cells[i].style.backgroundColor);
            }

            const jsonString = JSON.stringify(artData);
            localStorage.setItem(CANVAS_KEY, jsonString);

            document.getElementById('message').textContent = 'アートを保存しました！';
        }


        function loadArt() {
            const jsonString = localStorage.getItem(CANVAS_KEY);

            if (!jsonString) {
                return;
            }

            const artData = JSON.parse(jsonString);
            const cells = document.getElementById('canvas').querySelectorAll('.cell');

            for (let i = 0; i < cells.length; i++) {
                if (artData[i]) {
                    cells[i].style.backgroundColor = artData[i];
                }
            }
        }

        function clearArt() {
            const cells = document.getElementById('canvas').querySelectorAll('.cell');
            for (let i = 0; i < cells.length; i++) {
                cells[i].style.backgroundColor = COLORS[0]; // 白に設定
            }

            localStorage.removeItem(CANVAS_KEY);

            document.getElementById('message').textContent = 'アートをすべて消去しました！';
        }


        function createPalette() {
            const paletteElement = document.getElementById('color-palette');

            for (let i = 0; i < COLORS.length; i++) {
                const color = COLORS[i];
                const colorBox = document.createElement('div');
                colorBox.className = 'color-box';
                colorBox.style.backgroundColor = color;

                colorBox.addEventListener('click', function () {
                    selectedColor = color;

                    document.querySelectorAll('.color-box').forEach(box => {
                        box.classList.remove('selected');
                    });
                    colorBox.classList.add('selected');
                });

                paletteElement.appendChild(colorBox);
            }
            paletteElement.children[1].classList.add('selected');
        }

        
        function createGrid() {
            const canvasElement = document.getElementById('canvas');

            for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.style.backgroundColor = COLORS[0];

                cell.addEventListener('click', function () {
                    paintCell(cell);
                });

                canvasElement.appendChild(cell);
            }
        }

        
        // HTML要素が全て読み込まれてから以下の処理を実行する
        window.addEventListener('DOMContentLoaded', (event) => {
            //カラーパレットを生成
            createPalette();

            //グリッドを生成
            createGrid();

            //ボタンにイベントを登録
            const saveButton = document.getElementById('save-btn');
            const clearButton = document.getElementById('clear-btn');

            saveButton.addEventListener('click', saveArt);
            clearButton.addEventListener('click', clearArt);

            //保存されているデータがあれば読み込む
            loadArt();
        });