:: 关闭回显
@echo OFF
ECHO "============================= RELEASE START..."

SET version=1.0.0

:: commit
:: git add -A
:: git commit -m "release branch %version%"
:: npm version %version% --message "release %version%"

:: publish
:: git push
npm login
npm publish