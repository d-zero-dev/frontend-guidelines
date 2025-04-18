# 検証とテスト

## ブラウザチェック

対象とするブラウザやデバイスでの検証を行ってください。

### iOS Safari

iOS Safariの検証は、検証機を使うか、もしくはXCodeの[Simulator](https://developer.apple.com/documentation/safari-developer-tools/installing-xcode-and-simulators)を利用してください。

### Android Chrome

Android Chromeの検証は、検証機を使うか、もしくは[Android Studio](https://developer.android.com/studio?hl=ja)のAndroid Emulatorを利用してください。

## チェックツール

チェックツールを利用して問題の早期発見と修正を行ってください。

### 各種リンター

リンターが設定されています。エディタ上の警告、ビルド時・コミット時のリンターの警告を無視せずに修正してください。

### axe DevTools

アクセシビリティの問題を検出するためにAxeを利用してください。ブラウザ拡張機能の[axe DevTools - Web Accessibility Testing](https://chromewebstore.google.com/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)を利用して、localhost環境の時点でもチェックをしてください。指摘内容については基本的には修正をしてください。
