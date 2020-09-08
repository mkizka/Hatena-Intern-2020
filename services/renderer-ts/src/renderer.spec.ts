import { render } from "./renderer";

describe("render", () => {
  it("Markdown変換が出来る", async () => {
    const src = `# heading1
## heading2
### heading3
[Link](https://twitter.com)
* list1
  * list1
- list2
  - list2
1. list3
2. list3`;
    const html = await render(src);
    expect(html).toBe(`<h1>heading1</h1>
<h2>heading2</h2>
<h3>heading3</h3>
<p><a href="https://twitter.com">Link</a></p>
<ul>
<li>list1
<ul>
<li>list1</li>
</ul>
</li>
</ul>
<ul>
<li>list2
<ul>
<li>list2</li>
</ul>
</li>
</ul>
<ol>
<li>list3</li>
<li>list3</li>
</ol>`);
  });
});
