## 1. **schedule your Windows laptop to shut down automatically** 
---

You can **schedule your Windows laptop to shut down automatically** at a specific time or after a certain duration using several built-in methods—no third-party apps are needed. Here’s how you can do it, with steps tailored for Indian users and recent Windows versions (Windows 10/11):

## Method 1: Using Task Scheduler (Recommended for Regular Shutdowns)

Task Scheduler allows you to set your PC to auto shut down at a fixed time every day, which is very useful for work/study routines.

1. Open **Task Scheduler**:
    
    - Press the **Windows key**, type **Task Scheduler**, and press Enter.
        
2. Click **Create Basic Task…**.
    
3. Name the task (e.g., “Auto Shutdown”) and click **Next**.
    
4. Choose the frequency—**Daily** is most common—and click **Next**.
    
5. Set the **time** you want the laptop to shut down (e.g., 11:30 PM IST).
    
6. Select **Start a program** and click **Next**.
    
7. In the **Program/script** box, enter:
    
    text
    
    `C:\Windows\System32\shutdown.exe`
    
    In the **Add arguments** box, enter:
    
    text
    
    `/s /f /t 0`
    
    - `/s` shuts down, `/f` forces closing apps, `/t 0` sets timer to zero seconds.
        
8. Click **Next**, review your settings, then click **Finish**.
    

This will shut down your laptop at the chosen time every day[1](https://www.ionos.com/digitalguide/server/configuration/how-to-schedule-shutdown-in-windows-10/)[2](https://learn.microsoft.com/en-us/answers/questions/800ed207-f630-480d-8c92-dff2313c193b/how-to-schedule-computer-to-shut-down-at-a-certain?forum=windows-all)[6](https://www.windowscentral.com/software-apps/windows-11/how-to-shut-your-pc-down-at-a-specific-time-on-windows-11-and-10).

## Method 2: Using the Run Command (For Quick, One-Time Shutdown)

If you want to shut down your system after a specific duration (e.g., after 45 minutes):

1. Press **Windows + R** to open the Run dialog.
    
2. Type:
    
    text
    
    `shutdown -s -t 2700`
    
    Here, `2700` is the number of seconds (45 minutes × 60)[4](https://www.lifewire.com/create-shutdown-timer-in-windows-10-5180369)[5](https://helpdeskgeek.com/how-to-automatically-shut-down-a-windows-computer/)[6](https://www.windowscentral.com/software-apps/windows-11/how-to-shut-your-pc-down-at-a-specific-time-on-windows-11-and-10).
    
3. Click **OK**.
    

Your laptop will auto shut down after the specified duration.

- _To cancel a scheduled shutdown_: Open Run, type `shutdown -a`, and hit Enter[6](https://www.windowscentral.com/software-apps/windows-11/how-to-shut-your-pc-down-at-a-specific-time-on-windows-11-and-10).
    

## Method 3: Create a Shutdown Shortcut

1. Right-click on your Desktop > **New** > **Shortcut**.
    
2. Enter:
    
    text
    
    `shutdown /s /f /t 3600`
    
    Replace `3600` with the number of seconds (e.g., 1 hour).
    
3. Name the shortcut (e.g., “Shutdown in 1 hour”) and finish.
    
4. Double-click the shortcut whenever needed[6](https://www.windowscentral.com/software-apps/windows-11/how-to-shut-your-pc-down-at-a-specific-time-on-windows-11-and-10).
    

## Method 4: Advanced – Using PowerShell

For those comfortable with PowerShell:

- Open PowerShell as Administrator.
    
- Enter:
    
    text
    
    `Start-Sleep -Seconds 7200; Stop-Computer`
    
    This will shut down after 2 hours (7200 seconds)[6](https://www.windowscentral.com/software-apps/windows-11/how-to-shut-your-pc-down-at-a-specific-time-on-windows-11-and-10).
    

**These methods work on all recent Windows versions and do not require admin rights (except PowerShell, sometimes).** For Indian users, timings will be according to your local system clock (typically IST)[1](https://www.ionos.com/digitalguide/server/configuration/how-to-schedule-shutdown-in-windows-10/)[6](https://www.windowscentral.com/software-apps/windows-11/how-to-shut-your-pc-down-at-a-specific-time-on-windows-11-and-10). All instructions are applicable to users in Jharkhand or anywhere in India.