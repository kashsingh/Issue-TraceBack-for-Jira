import React, { useEffect, useState } from "react";
import { User } from "@forge/react";

export const head = {
  cells: [
    {
      key: "key",
      content: "Key",
      isSortable: false,
    },
    {
      key: "summary",
      content: "Summary",
      shouldTruncate: true,
      isSortable: true,
    },
    {
      key: "reporter",
      content: "Reporter",
      shouldTruncate: true,
      isSortable: false,
    },
    {
      key: "actor",
      content: "Deleted By",
      shouldTruncate: true,
      isSortable: false,
    },
    {
      key: "created",
      content: "Created",
      shouldTruncate: true,
      isSortable: true,
    },
    {
      key: "deletedOn",
      content: "Deleted",
      shouldTruncate: true,
      isSortable: true,
    },
  ],
};

const getReadableDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};

export const createRows = (results) => {
  const createCell = (key, content) => ({ key, content });
  const rows = results.map((data) => ({
    key: `${data.key}`,
    cells: [
      createCell(`${data.value.issuekey}`, data.value.issuekey),
      createCell(`${data.key}-0`, data.value.summary),
      createCell(
        `${data.value.reporter}`,
        <User accountId={data.value.reporter} />
      ),
      createCell(`${data.value.actor}`, <User accountId={data.value.actor} />),
      createCell(`${data.key}-1`, getReadableDate(data.value.created)),
      createCell(`${data.key}-2`, getReadableDate(data.value.deletedOn)),
    ],
  }));
  return rows;
};
