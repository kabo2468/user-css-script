function run(doms: Element[]): Element[] {
    const filtered = doms.filter((dom) => dom.textContent);
    for (let i = 0; i < filtered.length; i++) {
        const dom = filtered[0];
        try {
            dom.innerHTML = dom.innerHTML.replace(/コピー/g, 'コビー');
        } catch (error) {
            console.error('CtC.user.js', error);
        }
        filtered.shift();
    }
    return filtered.flatMap((dom) => Array.from(dom.children));
}

window.onload = function () {
    const doms = document.body.children;
    let arr = Array.from(doms);

    setTimeout(() => {
        const int = setInterval(loop, 100);
        function loop() {
            arr = run(arr);

            if (arr.length === 0) clearInterval(int);
        }
    }, 1000);
};
