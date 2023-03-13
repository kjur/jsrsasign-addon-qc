# jsrsasign-addon-qc
jsrsasign addon for qcStatements extension and EU qualified certificate OIDs

## Usage for Node.JS

```JavaScript
let jsrsasign = require("jsrsasign");
require("jsrsasign-addon-qc").register(jsrsasign);
```

## Usage for web pages

```html
<script type="module">
import jsrsasign from 'https://cdn.jsdelivr.net/npm/jsrsasign@10.7.0/+esm';
import qcAddon from 'https://cdn.jsdelivr.net/npm/jsrsasign-addon-qc@0.9.4/+esm';
qcAddon.register(jsrsasign);
// Then you can use jsrsasign with supports qualified certificate parser and OIDs
</script>
```

Please use latest version.

