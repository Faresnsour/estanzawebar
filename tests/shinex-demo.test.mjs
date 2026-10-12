import test from 'node:test';
import assert from 'node:assert/strict';
import { initialShinex, shinexReducer, validateShinex, SHINEX_PRICES, normalisePhone, shinexDateLabel, shinexMessage } from '../src/lib/shinex-demo.ts';
import { localDateId } from '../src/lib/booking.ts';
import { getTranslator } from '../src/i18n/messages.ts';
const today = '2026-10-12';
const filled = { car:'sedan', date:today, period:'morning', name:'Demo Person', phone:'٠٧٨ ٢٩٨ ٧٧٣٣', area:'Sample area', notes:'Sample notes' };

test('approved prices and message contents stay tied to each current vehicle', () => {
  assert.deepEqual(SHINEX_PRICES,{sedan:29,suv5:39,suv7:49});
  for (const locale of ['ar','en']) for (const [car,price] of Object.entries(SHINEX_PRICES)) {
    const t = getTranslator(locale);
    const message=shinexMessage({...filled,car},locale,t);
    for(const value of [t(`shinex.${car}`),`${price} ${t('shinex.currency')}`,t('shinex.package_name'),t('shinex.pending'),t('shinex.no_send'),'0782987733','Sample area','Sample notes']) assert.ok(message.includes(value),value);
  }
});
test('Amman date boundaries, leap dates and past-date rejection', () => {
  assert.equal(localDateId(new Date('2026-10-11T21:30:00Z')),today);
  assert.equal(validateShinex({...filled,date:'2026-10-11'},today,1).date,'shinex.error_date');
  assert.ok(validateShinex({...filled,date:'2027-02-29'},today,1).date);
  assert.equal(validateShinex({...filled,date:'2028-02-29'},today,1).date,undefined);
  assert.match(shinexDateLabel(today,'en'),/Monday/);
  assert.ok(validateShinex({...filled,period:'available'},today,1).period);
});
test('local and international numbers accept Arabic, Persian and Latin digits',()=>{
  for (const phone of ['078 298 7733','٠٧٨٢٩٨٧٧٣٣','۰۷۸۲۹۸۷۷۳۳','+962 (78) 298-7733','00962 78 298 7733']) assert.equal(validateShinex({...filled,phone},today,2).phone,undefined);
  assert.equal(normalisePhone('٠٧٨ ٢٩٨ ٧٧٣٣'),'0782987733');
  for(const phone of ['abc','078','0781234567abc']) assert.ok(validateShinex({...filled,phone},today,2).phone);
});
test('back/edit preserves details; duplicate final actions prepare once; reset clears everything',()=>{
  let state={...initialShinex(),draft:{...filled}};
  for(let from=0;from<3;from++) state=shinexReducer(state,{type:'next',from,today});
  state=shinexReducer(state,{type:'back',step:0});
  state=shinexReducer(state,{type:'edit',field:'car',value:'suv7'});
  assert.equal(state.draft.name,filled.name);
  for(let from=0;from<3;from++) state=shinexReducer(state,{type:'next',from,today});
  const prepared=shinexReducer(state,{type:'next',from:3,today});
  assert.equal(prepared.prepared,true);
  assert.equal(shinexReducer(prepared,{type:'next',from:3,today}),prepared);
  assert.equal(shinexReducer(prepared,{type:'edit',field:'car',value:'sedan'}),prepared);
  assert.equal(shinexReducer(prepared,{type:'back',step:2}).draft.car,'suv7');
  assert.deepEqual(shinexReducer(prepared,{type:'reset'}),initialShinex());
  assert.equal(shinexReducer(state,{type:'next',from:3,today:'2026-10-13'}).prepared,false);
});
