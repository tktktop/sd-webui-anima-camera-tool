import os
from fastapi import FastAPI, Request
from modules import script_callbacks

def on_app_started(demo, app: FastAPI):
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    html_path = os.path.join(base_dir, "html", "camera-tool.html")
    tags_path = os.path.join(base_dir, "html", "tags.txt")

    @app.get("/anima_camera/get_html")
    def get_html():
        if os.path.exists(html_path):
            with open(html_path, "r", encoding="utf-8") as f:
                return {"html": f.read()}
        return {"html": "<h1>未找到 camera-tool.html</h1>"}

    # 新增：读取 tags.txt
    @app.get("/anima_camera/get_tags")
    def get_tags():
        if os.path.exists(tags_path):
            with open(tags_path, "r", encoding="utf-8") as f:
                return {"tags": f.read()}
        return {"tags": None}

    # 新增：保存 tags.txt
    @app.post("/anima_camera/save_tags")
    async def save_tags(request: Request):
        data = await request.json()
        tags_text = data.get("tags", "")
        try:
            with open(tags_path, "w", encoding="utf-8") as f:
                f.write(tags_text)
            return {"status": "success"}
        except Exception as e:
            return {"status": "error", "message": str(e)}

script_callbacks.on_app_started(on_app_started)
print("\n[Anima Camera] ✅ 后端接口已升级，支持无缝读写 tags.txt！\n")