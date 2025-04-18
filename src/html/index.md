# HTMLガイドライン

🔰 当ドキュメントは「[コーディングガイドライン](../index.md)」の一部です。
基本的なガイドライン・ルールについては先にそれから確認してください。

## ガイドラインの目的

HTMLのガイドラインは次の3つを主な目的として規定します。

- セマンティック・アクセシビリティ
  - コンテキスト（文章などの前後の脈絡・文脈）によって最適なマークアップができること
  - 普遍的でアクセシブルなマークアップができること
- 一貫性
  - 一貫したルールがあることで個人の好みや矜持による品質のバラツキを抑えること
  - プロジェクトをまたいでも混乱が少ないこと
- メンテナンス性
  - デザインの変更に対して柔軟で応用が効く汎用的な作りであること
  - コンポーネントの単位で影響範囲を把握しやすく管理できること

### HTMLの品質を支える規格

次の規格やガイドラインを参考に最適な実装をしていきます。

#### HTML Living Standard

原則として[**HTML Living Standard**](https://momdo.github.io/html/)の規定は例外なく従います。

#### WAI-ARIA

WAI-ARIAは[WAI-ARIA 1.2](https://momdo.github.io/wai-aria-1.2/)を基本に、ブラウザや支援技術の実装状況を鑑みながら判断します。

#### WCAG (Web Content Accessibility Guideline)

[WCAG 2.2](https://waic.jp/translations/WCAG22/)の4原則（知覚可能、操作可能、理解可能、堅牢性）に基づいてマシンリーダブルなマークアップをします。

#### APG (ARIA Authoring Practices Guide)

[ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/)を参考にUIを実装します。特にARIA属性やキーボードの操作については特別な理由がない限りこれに則って実装します。
