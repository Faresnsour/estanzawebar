import test from 'node:test';
import assert from 'node:assert/strict';
import { initialBookingDemo, bookingDemoReducer, validateBooking, demoDates } from '../src/lib/booking-request-demo.ts';
const today = '2026-12-29';
const next = state => bookingDemoReducer(state, { type: 'advance', from: state.step, today });
const edit = (state, field, value) => bookingDemoReducer(state, { type: 'edit', field, value });
test('seven real upcoming dates cross month and year boundaries correctly', () => {
 assert.deepEqual(demoDates(today), ['2026-12-30','2026-12-31','2027-01-01','2027-01-02','2027-01-03','2027-01-04','2027-01-05']);
 assert.equal(demoDates('2028-02-28')[0], '2028-02-29');
});
test('validation rejects expired selections, unknown slots and invalid customer details', () => {
 const draft = initialBookingDemo(today).draft;
 assert.deepEqual(validateBooking(draft,today,true), {name:'bookingSite.error_name',phone:'bookingSite.error_phone'});
 assert.ok(validateBooking({...draft,date:'2026-12-29'},today).date);
 assert.ok(validateBooking({...draft,date:'2027-02-31'},today).date);
 assert.ok(validateBooking({...draft,time:'25:00'},today).time);
 assert.ok(validateBooking({...draft,service:'real-company'},today).service);
 assert.ok(validateBooking({...draft,name:'Demo',phone:'not a number'},today,true).phone);
 assert.deepEqual(validateBooking({...draft,name:'Demo',phone:'٠٠٠ ٠٠٠ ٠٠٠٠'},today,true),{});
 assert.deepEqual(validateBooking({...draft,name:'Demo',phone:'000 000 0000'},today,true),{});
});
test('the journey retains edits on back, requires review, and registers exactly once', () => {
 let state = initialBookingDemo(today);
 state = edit(state,'service','third'); state = next(state);
 assert.equal(state.step,1);
 assert.equal(next(state),state, 'empty personal details cannot proceed');
 state = edit(edit(state,'name','Sample Person'),'phone','000 000 0000');
 state = next(state); assert.equal(state.step,2);
 state = bookingDemoReducer(state,{type:'back',step:0});
 assert.equal(state.draft.name,'Sample Person');
 state = edit(state,'time','13:00'); state = next(next(state));
 const staleClick = {type:'advance',from:1,today};
 assert.equal(bookingDemoReducer(state,staleClick),state, 'queued click must not skip review');
 state = next(state); assert.equal(state.step,3);
 assert.equal(state.request.time,'13:00'); assert.equal(state.request.reference,'DEMO-104');
 const recorded=state;
 state=bookingDemoReducer(state,{type:'advance',from:2,today});
 assert.equal(state,recorded, 'double submission does not create another record');
 assert.equal(edit(state,'name','Changed'),state, 'recorded request remains fixed');
 state=bookingDemoReducer(state,{type:'reset',today});
 assert.equal(state.request,null); assert.equal(state.step,0); assert.equal(state.draft.phone,'');
 assert.equal(state.sequence,105);
});
test('a draft left open overnight must be revalidated before recording', () => {
 let state=initialBookingDemo(today); state=edit(edit(state,'name','Sample Person'),'phone','000 000 0000');
 state=next(next(state));
 assert.equal(bookingDemoReducer(state,{type:'advance',from:2,today:'2027-01-01'}),state);
});
