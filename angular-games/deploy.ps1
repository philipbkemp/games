clear
ng build
Remove-Item ../docs/* -Recurse -Force
Copy-Item -Path dist/angular-games/* -Destination ../docs -Recurse
Remove-Item ../docs/assets/app.config.json
Rename-Item -Path ../docs/assets/app.config.prod.json -NewName "app.config.json"
Rename-Item -Path ../docs/index.prod.html -NewName "index.html"