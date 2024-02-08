import { Metadata } from "next";
import React from "react";
export const runtime = "edge";

type Data = {
  headline: [key: string, value: string][];
  status: ([symbol: string] | [key: string, value: string])[];
  list: string[];
};

function parseTSV(tsv: string): Data {
  const rows = tsv.split(/\r?\n/).map((row) => row.split("\t"));
  const data: Data = {
    headline: [],
    status: [],
    list: [],
  };

  for (const row of rows) {
    const cells = row.filter((cell) => cell !== "");

    if (cells.length < 2) continue;

    switch (cells[0]) {
      case "headline":
        data.headline.push([cells[1], cells[2]]);
        break;

      case "status":
        if (cells.length === 2) {
          data.status.push([cells[1]]);
        } else if (cells.length >= 3) {
          data.status.push([cells[1], cells[2]]);
        }
        break;

      case "list":
        data.list.push(cells[1]);
        break;
    }
  }

  console.log(data);

  return data;
}

export const metadata: Metadata = {
  title: "Simple Score Card",
};

export default async function Card({
  params,
}: {
  params: { sheetId: string };
}) {
  const { sheetId } = params;

  const url = `https://docs.google.com/spreadsheets/d/${encodeURIComponent(
    sheetId
  )}/export?format=tsv`;

  const text = await fetch(url, { cache: "no-store" }).then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }
    return res.text();
  });
  const { headline, status, list } = parseTSV(text);

  return (
    <main className="flex flex-col gap-6 justify-center items-center mx-1 my-10">
      <div>
        {headline.map(([key, value], i) => (
          <div
            className="shadow text-lg stats rounded-md bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200"
            key={i}
          >
            <div className="stat place-items-center">
              <div className="stat-title">{key}</div>
              <div className="stat-value">{value}</div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="stats border">
          {status.map((item, i) => (
            <StatusItem data={item} key={i} />
          ))}
        </div>
      </div>

      {list.length > 0 && (
        <div>
          <ul className="bg-base-200 w-80 rounded-box py-1">
            {list.map((item, i) => (
              <ListItem item={item} key={i} />
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}

function StatusItem({ data }: { data: string[] }) {
  while (data.length > 0 && data[data.length - 1] === "") {
    data.pop();
  }
  if (data.length === 0) return null;

  if (data.length > 1) {
    return (
      <div className="stat">
        <div className="stat-title">{data[0]}</div>
        <div>{data[1]}</div>
      </div>
    );
  } else {
    return (
      <div className="stat">
        <div className="stat-figure stat-value">{data[0]}</div>
      </div>
    );
  }
}

function ListItem({ item }: { item: string }) {
  const regex = /\((.*?)\)/g;

  const parts = item.split(regex);

  return (
    <li className="px-5 py-3 flex">
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {index % 2 === 0 ? (
            part.length > 0 && <span className="flex-grow">{part}</span>
          ) : (
            <span className="badge badge-outline">{part}</span>
          )}
        </React.Fragment>
      ))}
    </li>
  );
}
