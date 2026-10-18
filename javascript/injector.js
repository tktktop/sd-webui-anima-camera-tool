onUiLoaded(function() {
    // 1. 创建右下角按钮
    const btn = document.createElement('div');
    btn.id = 'anima-floating-btn';
    btn.innerHTML = '📷 相机工具';
    btn.style.cssText = `
        position: fixed; bottom: 30px; right: 30px;
        background: #ff9800; color: #fff; padding: 12px 20px;
        border-radius: 30px; cursor: pointer; font-weight: bold;
        font-size: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.6);
        z-index: 999999; user-select: none;
        transition: transform 0.2s, background 0.2s;
    `;

    // 2. 创建全屏悬浮窗（默认隐藏）
    const wrapper = document.createElement('div');
    wrapper.id = 'anima-wrapper';
    wrapper.style.cssText = `
        position: fixed; top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        width: 90vw; max-width: 1400px; height: 85vh;
        background: #1e1e1e; border: 1px solid #444;
        border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.9);
        z-index: 1000000; display: none; flex-direction: column;
        overflow: hidden;
    `;

    // 3. 标题栏
    const header = document.createElement('div');
    header.style.cssText = `
        padding: 15px 20px; background: #2a2a2a; color: #ff9800;
        font-weight: bold; display: flex; justify-content: space-between;
        align-items: center; border-bottom: 1px solid #444;
    `;
    header.innerHTML = '<span>📷 Anima 相机控制工具 </span><span id="anima-close" style="cursor:pointer; color:#fff; font-size:18px;">✖</span>';

    // 4. 内容区（iframe）
    const content = document.createElement('div');
    content.style.cssText = 'flex: 1; background: #000;';
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'width: 100%; height: 100%; border: none; display: block;';
    content.appendChild(iframe);

    // 5. 组装并挂载到 body 最外层
    wrapper.appendChild(header);
    wrapper.appendChild(content);
    document.body.appendChild(btn);
    document.body.appendChild(wrapper);

    // 6. 交互逻辑（懒加载防卡顿）
    let isLoaded = false;
    btn.onclick = () => {
        wrapper.style.display = 'flex';
        btn.style.display = 'none';
        
        // 第一次点击时，才去请求 HTML 并塞进 iframe
        if (!isLoaded) {
            iframe.srcdoc = "<h2 style='color:white; padding:20px;'>正在加载 3D 引擎，请稍候...</h2>";
            fetch('/anima_camera/get_html')
                .then(res => res.json())
                .then(data => {
                    iframe.srcdoc = data.html; // 直接注入，无任何跨域/404问题
                    isLoaded = true;
                })
                .catch(err => {
                    iframe.srcdoc = "<h2 style='color:red; padding:20px;'>加载失败: " + err + "</h2>";
                });
        }
    };

    document.getElementById('anima-close').onclick = () => {
        wrapper.style.display = 'none';
        btn.style.display = 'block';
    };

    btn.addEventListener('mouseenter', () => btn.style.transform = 'scale(1.05)');
    btn.addEventListener('mouseleave', () => btn.style.transform = 'scale(1)');

    console.log("✅ Anima 悬浮窗注入成功，零污染模式已启动！");
});