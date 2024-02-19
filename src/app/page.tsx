import { Metadata } from "next";
import ViewCardForm from "@/components/ViewCardForm";

export const metadata: Metadata = {
  title: "シンプルスコアカード | カッコイイスコアカードを簡単に生成",
};

export default function Top() {
  const SAMPLE_SHEET_ID = "1fDirH0H8LFJs9IneHnU0oDUbsnCcH-dkeY1_N5z18FQ";

  return (
    <main className="leading-loose">
      <div className="min-h-screen m-8">
        <h1 className="text-4xl break-word whitespace-pre">
          シンプル
          <wbr />
          スコアカード
        </h1>
        <div className="mt-6">
          シンプルスコアカードは、カッコイイスコアカードを簡単に生成できるツールです。
        </div>
        <h2 className="text-2xl mb-5 mt-10">使い方</h2>
        <ol className="list-decimal ps-5">
          <li>Googleスプレッドシートを作成し、リンク公開で共有します。</li>
          <li>
            スプレッドシートにデータを記入します。A列が種別（
            <code>headline</code>、<code>status</code>、<code>list</code>
            ）、残りのB、C列がデータです。（以下の例を参照してください）
          </li>
          <li>
            シートのIDがそのままカードのIDになります。シートを更新すると、カードの内容も更新されます（要リロード）。
            <br />
            例:
            <ul className="list-disc ps-5 break-all">
              <li className="list-item">
                シートURL:{" "}
                <a
                  className="text-blue-600 underline underline-offset-2"
                  href={`https://docs.google.com/spreadsheets/d/${SAMPLE_SHEET_ID}/edit`}
                >
                  https://docs.google.com/spreadsheets/d/
                  <strong>{SAMPLE_SHEET_ID}</strong>
                  /edit
                </a>
              </li>
              <li>
                👉 カードURL:{" "}
                <a
                  className="text-blue-600 underline underline-offset-2"
                  href={`./card/${SAMPLE_SHEET_ID}`}
                >
                  https://simple-score-card.pages.dev/card/
                  <strong>{SAMPLE_SHEET_ID}</strong>
                </a>
              </li>
            </ul>
          </li>
          <li>
            シートを作ったらここからジャンプ:
            <ViewCardForm />
          </li>
        </ol>
        <h2 className="text-2xl mb-5 mt-10">種別の例</h2>
        <h3 className="text-xl my-4">
          A列=<code>headline</code>
        </h3>
        <div>
          <div className="shadow text-lg stats rounded-md bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
            <div className="stat place-items-center">
              <div className="stat-title">B列</div>
              <div className="stat-value">C列</div>
            </div>
          </div>
        </div>
        <h3 className="text-xl my-4">
          A列=<code>status</code>
        </h3>
        <p>複数並べられます</p>
        <div>
          <div className="stats border">
            <div className="stat">
              <div className="stat-figure stat-value">B列のみ</div>
            </div>
            <div className="stat">
              <div className="stat-title">B列</div>
              <div>C列</div>
            </div>
          </div>
        </div>
        <h3 className="text-xl my-4">
          A列=<code>list</code>
        </h3>
        <p>複数並べられます</p>
        <div>
          <ul className="bg-base-200 w-80 rounded-box py-1">
            <li className="px-5 py-3 flex items-center">
              <span className="flex-grow">B列</span>
            </li>
            <li className="px-5 py-3 flex items-center">
              <span className="flex-grow">(xyz) は👉のようになります</span>
              <span className="badge badge-outline">xyz</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
