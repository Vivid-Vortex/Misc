# 📝 Setting up Multiple MongoDB MCP Servers in Claude

### 🔹 Steps to Locate and Edit Config File

1. Press **Win + R**
2. Type:

   ```
   %APPDATA%\Claude
   ```

   and hit **Enter**.
   (This opens `C:\Users\<YourUsername>\AppData\Roaming\Claude`)
3. Locate `claude_desktop_config.json`.

   * If it does not exist, create a new file with this name.

---

### 🔹 Example Config for Multiple MongoDB Servers

```json
{
  "mcpServers": {
    "mongoProd": {
      "command": "npx",
      "args": [
        "mongo-mcp",
        "mongodb://prod_user:prod_pass@prod_host:27017/prodDB?authSource=admin"
      ]
    },
    "mongoDev": {
      "command": "npx",
      "args": [
        "mongo-mcp",
        "mongodb://dev_user:dev_pass@dev_host:27017/devDB?authSource=admin"
      ]
    }
  }
}
```

* `mongoProd` → connects to the **production database**
* `mongoDev` → connects to the **development database**

---

### 🔹 Using Multiple MCP Servers in Claude

When multiple servers are configured:

* They show up as different **tools** in Claude.
* You can explicitly tell Claude which one to use.

✅ Example commands:

* `Use mongoProd MCP server: list collections in prodDB`
* `Query mongoDev MCP server: find all documents in users collection`
* `Insert a new document into orders collection using mongoProd`

---

### ✅ Summary

* Config file path: `%APPDATA%\Claude\claude_desktop_config.json`
* Add multiple MCP servers by defining **unique keys** (`mongoProd`, `mongoDev`, etc.)
* Call them in Claude by **specifying the server name** in your request.

---

Do you want me to also add the **CLI version (`claude mcp add …`)** into this note so you can manage multiple MongoDB MCPs without editing JSON manually?
