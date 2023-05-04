$scripts = 'start-api.ps1', 'start-ui.ps1'

foreach ($script in $scripts) {
    Write-Host "Starting $script"
    Start-Process pwsh "-File $script"
}

./start-swa.ps1
