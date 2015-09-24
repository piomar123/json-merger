# json-merger

Mergetool for 3-way JSON files merge
====================================

Basics
------------------
To diff two files, execute with parameters:
`app.js old_file.json new_file.json`

**Currently, only diff is possible, without merging or changing any files.**
The merger works by simply comparing firstly local changes, then remote and finally both differences together.

Git mergetool
------------------
You can setup as a Git 3-way merge tool with call parameters:

`app.js $BASE $LOCAL $REMOTE $MERGED`

Compatibly with Git, when `$BASE` == `$MERGED`, application is started 
as a difftool between `$LOCAL` (old) and `$REMOTE` (new) files.

To configure custom mergetool, edit your git configuration with:
`git config --global -e`

And add configuration specified below:

```
[mergetool "jsonmerger"]
    cmd = "/path/to/json-merger/app.js \"$BASE\" \"$LOCAL\" \"$REMOTE\" \"$MERGED\""
```

Then, you can call as a difftool using:

`git difftool commitA commitB -t jsonmerger`

Or when merge/rebase conflict occurs, accepting json files only:

`git mergetool -t jsonmerger`


More info can be found here:
* [Git: git-mergetool](http://git-scm.com/docs/git-mergetool)
* [Google: setup git mergetool](https://www.google.com/search?q=setup+git+mergetool)
