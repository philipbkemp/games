clear
Write-Host "Building Application                                                                                " -ForegroundColor Blue -BackgroundColor White
ng build --index=/src/index.prod.html
Write-Host "Removing old build files                                                                            " -ForegroundColor Blue -BackgroundColor White
Remove-Item ../docs/* -Recurse -Force
Write-Host "Copying new build files                                                                             " -ForegroundColor Blue -BackgroundColor White
Copy-Item -Path dist/angular-games/* -Destination ../docs -Recurse
Write-Host "Renaming files for PROD                                                                             " -ForegroundColor Blue -BackgroundColor White
Remove-Item ../docs/assets/app.config.json
Rename-Item -Path ../docs/assets/app.config.prod.json -NewName "app.config.json"
Rename-Item -Path ../docs/index.prod.html -NewName "index.html"
Copy-Item -Path ../docs/index.html -Destination ../docs/404.html