type nul > file_name.extension # Equivalent to touch linux to create file. nul means empty file.
alt + space #Quick Launcer via power toys. Run/search/calculate etc anything with one shortcut.

kill any windows tasks which is occuping the required port (which is say 2181):
1. netstat -ano | findstr :2181 #It will give you 5 column data including processId at the last column if any such process exists.
2. copy processId and run below command
taskkill /PID 4528 -F #Here is 4528 is the processId.

Note: Short combining step 1 and step 2 (for powershell admin mode only): Just modify port number.

foreach ($p in (netstat -ano | findstr :8183 | % { $_.Split()[-1] } | Select-Object -Unique)) { taskkill /F /PID $p }

---
### To get serial number

wmic bios get serialnumber 
---
### To get hostname

hostnmae
---

