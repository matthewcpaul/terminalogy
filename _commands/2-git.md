---
title: GitHub
primary: git
commands:
    # Configure Tooling
    - title: Configure Tooling
      des: Configure user information for all local repositories
      commands:
        - cmd: config --global user.name "[name]"
          des: Sets the name you want attached to your commit transactions
        - cmd: config --global user.email "[email address]"
          des: Sets the email you want attached to your commit transactions
        - cmd: config --global color.ui auto
          des: Enables helpful colorization of command line output
    # Create Repositories
    - title: Create Repositories
      des: Stat a new repository or obtain one from an existing URL
      commands:
        - cmd: init [project-name]
          des: Creates a new local repository with the specified name
        - cmd: clone [url]
          des: Downloads a project and its entire version history
    # Make Changes
    - title: Make Changes
      des: Review edits and craft a commit transaction
      commands:
        - cmd: status
          des: Lists all new or modified files to be committed
        - cmd: diff
          des: Shows file differences not yet staged
        - cmd: add [file]
          des: Snapshots the file in preparation for versioning
        - cmd: diff --staged
          des: Shows file differences between staging and the file version
        - cmd: reset [file]
          des: Unstages the file, but preserves its contents
        - cmd: commit -m"[descriptive message]
          des: Records file snapshots permanently in version history
    # Group Changes
    - title: Group Changes
      des: Name a series of commits and combine completed efforts
      commands:
        - cmd: branch
          des: Lists all local branches in the current repository
        - cmd: branch [branch-name]
          des: Creates a new branch
        - cmd: checkout [branch-name]
          des: Switches to the specified branch and updates the working directory
        - cmd: merge [branch]
          des: Combines the specified branch's history into the current branch
        - cmd: branch -d [branch-name]
          des: Deletes the specified branch
    # Stash
    - title: Save Fragments
      des: Shelve and restore incomplete changes
      commands:
        - cmd: stash
          des: Temporarily stores all modified tracked files
        - cmd: stash pop
          des: Restores the most recently stashed files
        - cmd: stash list
          des: Lists all stashed changessets
        - cmd: stash drop
          des: Discards the most recently stashed changeset
    # Review History
    - title: Review History
      des: Browse and inspect the evolution of project files
      commands:
        - cmd: log
          des: Lists version history for the current branch
        - cmd: log --follow
          des: Lists version history for a file, including butts
        - cmd: log --follow
          des: Lists version history for a file, including renames
        - cmd: diff [first-branch]...[second-branch]
          des: Shows content differences between two branches
        - cmd: show [commit]
          des: Outputs metadata and content changes of the specified commit
    #   Redo commits
    - title: Redo commits
      des: Erase mistakes and craft replacement history
      commands:
        - cmd: reset [commit]
          des: Undoes all commits after [commit], preserving changes locally
        - cmd: reset --hard [commit]
          des: Discards all history and changes back to the specified commit
    #   Synchronize changes
    - title: Synchronize changes
      des: Register a repository bookmark and exchange version history
      commands:
        - cmd: fetch [bookmark]
          des: Undoes all commits after [commit], preserving changes locally
        - cmd: reset --hard [commit]
          des: Discards all history and changes back to the specified commit
---
