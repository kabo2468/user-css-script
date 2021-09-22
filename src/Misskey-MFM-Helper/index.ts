const mfm = [
    {
        name: 'リンク',
        text: '[|](URL)',
    },
    {
        name: '太字',
        text: '**|**',
    },
    {
        name: '目立たなく',
        text: '<small>|</small>',
    },
    {
        name: '中央寄せ',
        text: '<center>|</center>',
    },
    {
        name: 'コード(インライン)',
        text: '`|`',
    },
    {
        name: 'コード(ブロック)',
        text: '```\n|\n```',
    },
    {
        name: '数式(インライン)',
        text: '\\(|\\)',
    },
    {
        name: '引用',
        text: '> |',
    },
    {
        name: '検索',
        text: '| 検索',
    },
    {
        name: 'びよんびよん',
        text: '$[jelly |]',
    },
    {
        name: 'じゃーん',
        text: '$[tada |]',
    },
    {
        name: 'ジャンプ',
        text: '$[jump |]',
    },
    {
        name: 'バウンド',
        text: '$[bounce |]',
    },
    {
        name: 'ぶるぶる',
        text: '$[shake |]',
    },
    {
        name: 'ブレ',
        text: '$[twitch |]',
    },
    {
        name: '右回転',
        text: '$[spin |]',
    },
    {
        name: '左回転',
        text: '$[spin.left |]',
    },
    {
        name: '往復回転',
        text: '$[spin.alternate |]',
    },
    {
        name: '縦右回転',
        text: '$[spin.x |]',
    },
    {
        name: '縦左回転',
        text: '$[spin.x,left |]',
    },
    {
        name: '縦往復回転',
        text: '$[spin.x,alternate |]',
    },
    {
        name: '横右回転',
        text: '$[spin.y |]',
    },
    {
        name: '横左回転',
        text: '$[spin.y,left |]',
    },
    {
        name: '横往復回転',
        text: '$[spin.y,alternate |]',
    },
    {
        name: '左右反転',
        text: '$[flip |]',
    },
    {
        name: '上下反転',
        text: '$[flip.v |]',
    },
    {
        name: '上下左右反転',
        text: '$[flip.h,v |]',
    },
    {
        name: '明朝体',
        text: '$[font.serif |]',
    },
    {
        name: '等幅フォント',
        text: '$[font.monospace |]',
    },
    {
        name: '手書きフォント',
        text: '$[font.cursive |]',
    },
    {
        name: '装飾フォント',
        text: '$[font.fantasy |]',
    },
    {
        name: '大きく',
        text: '$[x2 |]',
    },
    {
        name: 'とても大きく',
        text: '$[x3 |]',
    },
    {
        name: '究極に大きく',
        text: '$[x4 |]',
    },
    {
        name: 'ぼかし',
        text: '$[blur |]',
    },
    {
        name: 'レインボー',
        text: '$[rainbow |]',
    },
    {
        name: 'キラキラ',
        text: '$[sparkle |]',
    },
] as const;

setInterval(() => {
    const elm = document.querySelectorAll('.gafaadew>header>div');

    if (!elm.length) return;

    elm.forEach((e) => {
        if (e.getElementsByClassName('mmhujs-open-btn').length) return;

        const btn = createOpenBtn();
        btn.style.display = 'inline-block';
        e.prepend(btn);
    });
}, 1000);

function createOpenBtn() {
    const openBtn = document.createElement('button');
    openBtn.classList.add('mmhujs-open-btn');
    openBtn.textContent = 'MFM';
    openBtn.style.marginRight = '8px';
    openBtn.addEventListener('click', () => {
        if (document.getElementById('mmhujs-list')) return;
        const div = createListDom();
        document.body.append(div);
    });

    return openBtn;
}

function createListDom() {
    const div = document.createElement('div');
    div.id = 'mmhujs-list';
    div.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    div.style.position = 'absolute';
    div.style.left = '100px';
    div.style.top = '100px';
    div.style.width = '400px';
    div.style.zIndex = '10000';

    const closeBtn = document.createElement('button');
    closeBtn.id = 'mmhujs-close-btn';
    closeBtn.textContent = 'Close';
    closeBtn.addEventListener('click', () => {
        div.remove();
    });

    const closeDiv = document.createElement('div');
    closeDiv.append(closeBtn);

    const mfmDiv = document.createElement('div');
    mfmDiv.style.padding = '15px 20px 20px';
    mfmDiv.append(...createMFMBtnDoms());
    div.append(closeDiv, mfmDiv);

    div.addEventListener('mousedown', function (e) {
        const shiftX = e.clientX - div.getBoundingClientRect().left;
        const shiftY = e.clientY - div.getBoundingClientRect().top;

        move(e.pageX, e.pageY);

        function move(pageX: number, pageY: number) {
            div.style.left = `${pageX - shiftX}px`;
            div.style.top = `${pageY - shiftY}px`;
        }

        function onMousemove(e: { pageX: number; pageY: number }) {
            move(e.pageX, e.pageY);
        }

        document.addEventListener('mousemove', onMousemove);
        div.addEventListener(
            'mouseup',
            (() =>
                function fn() {
                    document.removeEventListener('mousemove', onMousemove);
                    div.removeEventListener('mouseup', fn);
                })()
        );
    });
    div.addEventListener('dragstart', () => false);

    return div;
}

function createMFMBtnDoms() {
    return mfm.map((elm) => {
        const btn = document.createElement('button');
        btn.textContent = elm.name;
        btn.addEventListener('click', () => {
            const textarea = document.getElementsByTagName('textarea');
            Array.from(textarea).forEach((area) => {
                const text = area.value;
                const nowCursor = area.selectionStart;

                const barIndex = elm.text.indexOf('|');
                area.value = `${text.slice(0, nowCursor)}${elm.text.replace('|', '')}${text.slice(
                    nowCursor
                )}`;

                const cursor = nowCursor + barIndex;
                area.focus();
                area.setSelectionRange(cursor, cursor);
            });
        });
        return btn;
    });
}
