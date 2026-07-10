"use client";
import { jsPDF } from "jspdf"; import { Button } from "@/components/ui/button";
export function ResultActions({ title, lines }:{title:string; lines:string[]}){ function pdf(){ const doc=new jsPDF(); doc.setFontSize(16); doc.text(title, 15, 18); doc.setFontSize(11); lines.forEach((l,i)=>doc.text(l,15,32+i*8)); doc.save(`${title.toLowerCase().replaceAll(" ","-")}.pdf`);} return <div className="flex flex-wrap gap-2 print:hidden"><Button onClick={()=>window.print()} variant="outline">Print result</Button><Button onClick={pdf}>Export PDF</Button></div> }
