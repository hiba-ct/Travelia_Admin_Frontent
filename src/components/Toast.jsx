import React from 'react';
import { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
let notify;
export const toast=(message,type='success')=>notify?.({message,type,id:Date.now()});
export function ToastContainer(){const [item,setItem]=useState(null);useEffect(()=>{notify=setItem;return()=>{notify=null}},[]);useEffect(()=>{if(!item)return;const t=setTimeout(()=>setItem(null),3500);return()=>clearTimeout(t)},[item]);if(!item)return null;const Icon=item.type==='error'?AlertCircle:CheckCircle2;return <div className={`toast-message ${item.type}`}><Icon size={19}/><span>{item.message}</span><button onClick={()=>setItem(null)}><X size={16}/></button></div>}
