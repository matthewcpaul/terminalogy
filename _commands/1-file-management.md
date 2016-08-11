---
title: File management
primary:
commands:
    # Navigation
    - title: Navigation
      des: Navigate folder structure
      commands:
        - cmd: ls
          des: List folders and files in current folder
        - cmd: cd [folder name]
          des: Navigate to folder
        - cmd: open [file name || url]
          des: Open file or url
        - cmd: cat [file name]
          des: Print file contents
    # Edit Files
    - title: Edit Files
      des: Navigate folder structure
      commands:
        - cmd: cp -rf [folder name] [new folder name]
          des: Copy folder
        - cmd: cp [file name] [new file name]
          des: Copy file
        - cmd: mv -rf [folder name] [destination]
          des: Move folder, can also be used to rename a folder
        - cmd: mv [file name] [new file name]
          des: Rename a file
        - cmd: touch [file name]
          des: Create a file
        - cmd: echo [string] > [file name]
          des: Insert text into file, deletes file content
        - cmd: echo -e [string] >> [file name]
          des: Appends string to end of file
---
