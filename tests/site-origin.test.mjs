import test from 'node:test';
import assert from 'node:assert/strict';
import {siteOrigin} from '../src/lib/site-origin.ts';
test('SEO URLs use the production redirect destination while preserving other deployments',()=>{
 for(const value of [undefined,'estanza.dev','https://estanza.dev','http://www.estanza.dev/','www.estanza.dev']) assert.equal(siteOrigin(value),'https://www.estanza.dev');
 assert.equal(siteOrigin('http://localhost:3000/path'),'http://localhost:3000');
 assert.equal(siteOrigin('preview.example.com'),'https://preview.example.com');
});
