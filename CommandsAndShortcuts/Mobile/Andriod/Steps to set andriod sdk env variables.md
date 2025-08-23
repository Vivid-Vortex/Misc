### 🧾 Question and Answer

**Question:**  
My Android SDK is installed at `C:\Users\Deepak\AppData\Local\Android\Sdk`. Can I set the environment variable in Windows the same way we do for Java?

**Answer:**  
✅ **Yes!** You can absolutely set the Android SDK environment variables in Windows the same way you set `JAVA_HOME`. This will make the SDK available system-wide.

---

### 🔧 Steps to Set Android SDK as Environment Variable in Windows

1. **Open Environment Variables**
    
    - Press **Win + R**, type `sysdm.cpl`, and press Enter.
        
    - Go to **Advanced** → **Environment Variables**.
        
2. **Create a New Variable for SDK**
    
    - Under **System Variables**, click **New**.
        
    - Name: `ANDROID_HOME`
        
    - Value: `C:\Users\Deepak\AppData\Local\Android\Sdk`
        
3. **Add SDK Tools to PATH**
    
    - In **System Variables**, select `Path` → **Edit** → **New**.
        
    - Add these entries (adjust path if needed):
        
        ```
        C:\Users\Deepak\AppData\Local\Android\Sdk\platform-tools
        C:\Users\Deepak\AppData\Local\Android\Sdk\emulator
        C:\Users\Deepak\AppData\Local\Android\Sdk\tools
        C:\Users\Deepak\AppData\Local\Android\Sdk\tools\bin
        ```
        
4. **Apply and Restart**
    
    - Click **OK** → Restart your terminal or PC.
        
5. **Verify**  
    Open Command Prompt or PowerShell:
    
    ```bash
    adb --version
    ```
    
    If it prints the version, your Android SDK is globally accessible.
    

---

💡 **Tip:**  
Setting it this way is exactly like `JAVA_HOME`—other tools like **React Native CLI**, **Flutter**, or **Gradle** will now detect the Android SDK automatically.

---

Would you like me to also include a **quick script** to set this up automatically instead of manually clicking through Windows settings?