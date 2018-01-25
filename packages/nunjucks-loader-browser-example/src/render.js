module.exports = function render(data, template) {
    const el = document.createElement('div');
    el.innerHTML = data.map(o => `
<div style="outline: 10px dashed deepskyblue; padding: 1em;">
${template.render(o)}
</div>
<br />
Context:
<code><pre>${JSON.stringify(o, null, 4)}</pre></code>
`).join('<hr />');

    document.body.appendChild(el);

    return el;
};