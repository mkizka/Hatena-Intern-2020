export type MarkdownTextNode = {
  type: string;
  value: string;
};

export type MarkdownLinkNode = {
  type: string;
  url: string;
  children: MarkdownTextNode[];
};
