clear all
*profesor solo hay que cambiar esta linea
cd "C:\Users\juanm\Desktop\manim\quarto-template\imagenes\economia"
use cuentasnacionales
set more off
gen tiempo = tq(1996q1) + _n - 1
format tiempo %tq
tsset tiempo
rename consumototal             ct
rename consumodehogareseipsfl   ch
rename bienesdurables           bd
rename bienesnodurables         bnd
rename servicios                srv
rename consumogobierno          cg
rename Formaciónbrutadecapitalfijo fbkf
rename Construcciónyotrasobras  cons
rename maquinariayequipo        mye
rename exportacionesdebienesyservicios  x
rename importacionesdebienesyservicios  m
rename productointernobruto     pib
local vars ct ch bd bnd srv cg fbkf cons mye x m pib
*logs
foreach v of local vars {
    gen l`v' = ln(`v')
    label variable l`v' "Log(`v')"
}
*ciclos hp
foreach v of local vars {
    tsfilter hp cyc_`v' = l`v', smooth(1600) trend(trend_`v')
    label variable cyc_`v' "Ciclo HP: `v'"
    label variable trend_`v' "Tendencia HP: `v'"
}
*preparar tablita
quietly sum cyc_pib
local sd_pib = r(sd)
local nvars : word count `vars'
matrix R = J(`nvars', 4, .)
matrix rownames R = `vars'
matrix colnames R = "SD" "SD_SDpib" "AC1" "CorrPIB"
local i = 1
*col 1 sd, col 2 sd/sdpib , col 3 autocorr, col 4 corr instantanea pib
foreach v of local vars {
    quietly sum cyc_`v'
    local sd_v = r(sd)
    matrix R[`i', 1] = `sd_v'
    matrix R[`i', 2] = `sd_v' / `sd_pib'
    quietly corr cyc_`v' L.cyc_`v'
    matrix R[`i', 3] = r(rho)
    quietly corr cyc_`v' cyc_pib
    matrix R[`i', 4] = r(rho)
    local i = `i' + 1
}

*tablita en consola
di _newline
di "=================================================================="
di "   PROPIEDADES DEL CICLO ECONÓMICO (Filtro HP, lambda=1600)"
di "=================================================================="
di "%-32s %10s  %10s  %8s  %10s" "Variable" "SD" "SD/SD(PIB)" "AC(1)" "Corr(PIB)"
di "--------------------------------------------------------------------------"
local i = 1
foreach v of local vars {
    local sd     : display %10.4f R[`i', 1]
    local sdrel  : display %10.4f R[`i', 2]
    local ac1    : display %8.4f  R[`i', 3]
    local corr   : display %10.4f R[`i', 4]
    local i = `i' + 1
}
di "=========================================================================="


preserve
clear
svmat R, names(col)
* nombres sin tildes ni caracteres especiales para evitar corrupcion
gen Variable = ""
replace Variable = "Consumo Total"             in 1
replace Variable = "Consumo Hogares e IPSFL"   in 2
replace Variable = "Bienes Durables"           in 3
replace Variable = "Bienes No Durables"        in 4
replace Variable = "Servicios"                 in 5
replace Variable = "Consumo Gobierno"          in 6
replace Variable = "FBCF Total"                in 7
replace Variable = "Construccion y Otras Obras" in 8
replace Variable = "Maquinaria y Equipo"       in 9
replace Variable = "Exportaciones B&S"         in 10
replace Variable = "Importaciones B&S"         in 11
replace Variable = "PIB"                       in 12
order Variable SD SD_SDpib AC1 CorrPIB
rename SD_SDpib SD_sobre_SD_PIB
rename CorrPIB  Corr_PIB
export delimited using "tabla_ciclo.csv", replace
restore
di _newline ">> Tabla exportada a: tabla_ciclo.csv"


*Gráfico 1. Ciclo pib y ciclo consumo total
twoway ///
    (line cyc_pib tiempo, lcolor(navy) lwidth(medthick)) ///
    (line cyc_ct  tiempo, lcolor(red)  lpattern(dash)), ///
    title("Componente Cíclico: PIB y Consumo Total") ///
    subtitle("Filtro Hodrick-Prescott (λ=1600)") ///
    ytitle("Desviación log de tendencia") xtitle("Trimestre") ///
    legend(pos(7) col(2) ring (0) label(1 "PIB") label(2 "Consumo Total"))
*cyc_ch cyc_bd cyc_bnd cyc_srv cyc_cg cyc_fbkf cyc_cons cyc_mye cyc_x cyc_m cyc_pib
graph save "consumototal", replace		


*Gráfico 2. Ciclo pib y ciclo consumo hogares e IPSFL	
twoway ///
    (line cyc_pib tiempo, lcolor(navy) lwidth(medthick)) ///
    (line cyc_ch  tiempo, lcolor(red)  lpattern(dash)), ///
    title("Componente Cíclico: PIB y Consumo Hogares e IPSFL") ///
    subtitle("Filtro Hodrick-Prescott (λ=1600)") ///
    ytitle("Desviación log de tendencia") xtitle("Trimestre") ///
    legend(label(1 "PIB") label(2 "Consumo Hogares e IPSFL"))	

graph save "consumohogar", replace	

*Gráfico 3. Ciclo pib y bienes durables	(Consumo)
twoway ///
    (line cyc_pib tiempo, lcolor(navy) lwidth(medthick)) ///
    (line cyc_bd  tiempo, lcolor(red)  lpattern(dash)), ///
    title("Componente Cíclico: PIB y Bienes Duranbles") ///
    subtitle("Filtro Hodrick-Prescott (λ=1600)") ///
    ytitle("Desviación log de tendencia") xtitle("Trimestre") ///
    legend(label(1 "PIB") label(2 "Bienes Duranbles"))	

*Gráfico 4. Ciclo pib y bienes no durables (Consumo)
twoway ///
    (line cyc_pib tiempo, lcolor(navy) lwidth(medthick)) ///
    (line cyc_bnd  tiempo, lcolor(red)  lpattern(dash)), ///
    title("Componente Cíclico: PIB y Bienes No Duranbles") ///
    subtitle("Filtro Hodrick-Prescott (λ=1600)") ///
    ytitle("Desviación log de tendencia") xtitle("Trimestre") ///
    legend(label(1 "PIB") label(2 "Bienes No Duranbles"))		

*Gráfico 5. Ciclo pib y servicios (Consumo)	
twoway ///
    (line cyc_pib tiempo, lcolor(navy) lwidth(medthick)) ///
    (line cyc_srv  tiempo, lcolor(red)  lpattern(dash)), ///
    title("Componente Cíclico: PIB y Servicios") ///
    subtitle("Filtro Hodrick-Prescott (λ=1600)") ///
    ytitle("Desviación log de tendencia") xtitle("Trimestre") ///
    legend(label(1 "PIB") label(2 "Servicios"))		

*Gráfico 6. Ciclo pib y gasto gobierno
twoway ///
    (line cyc_pib tiempo, lcolor(navy) lwidth(medthick)) ///
    (line cyc_cg  tiempo, lcolor(red)  lpattern(dash)), ///
    title("Componente Cíclico: PIB y Gobierno") ///
    subtitle("Filtro Hodrick-Prescott (λ=1600)") ///
    ytitle("Desviación log de tendencia") xtitle("Trimestre") ///
    legend(pos(7) col(2) ring (0) label(1 "PIB") label(2 "Gobierno"))		
graph save "gobierno", replace

*Gráfico 7. Ciclo pib y formación bruta de capital fijo	(Inversión)	
twoway ///
    (line cyc_pib tiempo, lcolor(navy) lwidth(medthick)) ///
    (line cyc_fbkf  tiempo, lcolor(red)  lpattern(dash)), ///
    title("Componente Cíclico: PIB e Inversión (FBCF) ") ///
    subtitle("Filtro Hodrick-Prescott (λ=1600)") ///
    ytitle("Desviación log de tendencia") xtitle("Trimestre") ///
    legend(pos(7) col(2) ring (0) label(1 "PIB") label(2 "Inversión (FBCF)"))	
	
graph save "inversion", replace

*Gráfico 7. Ciclo pib y construción y otras obras				
twoway ///
    (line cyc_pib tiempo, lcolor(navy) lwidth(medthick)) ///
    (line cyc_cons  tiempo, lcolor(red)  lpattern(dash)), ///
    title("Componente Cíclico: PIB y Construcción y otras obras") ///
    subtitle("Filtro Hodrick-Prescott (λ=1600)") ///
    ytitle("Desviación log de tendencia") xtitle("Trimestre") ///
    legend(label(1 "PIB") label(2 "Construcción y otras obras"))		
	
*Gráfico 8. Ciclo pib y maquinaria y equipo		
twoway ///
    (line cyc_pib tiempo, lcolor(navy) lwidth(medthick)) ///
    (line cyc_mye  tiempo, lcolor(red)  lpattern(dash)), ///
    title("Componente Cíclico: PIB y Maquinaria y equipo") ///
    subtitle("Filtro Hodrick-Prescott (λ=1600)") ///
    ytitle("Desviación log de tendencia") xtitle("Trimestre") ///
    legend(label(1 "PIB") label(2 "Maquinaria y equipo"))		

*Gráfico 9. Ciclo pib y exportaciones de bienes y servicios		
twoway ///
    (line cyc_pib tiempo, lcolor(navy) lwidth(medthick)) ///
    (line cyc_x  tiempo, lcolor(red)  lpattern(dash)), ///
    title("Componente Cíclico: PIB y Exportaciones") ///
    subtitle("Filtro Hodrick-Prescott (λ=1600)") ///
    ytitle("Desviación log de tendencia") xtitle("Trimestre") ///
    legend(label(1 "PIB") label(2 "Exportaciones"))		

*Gráfico 10. Ciclo pib y importaciones de bienes y servicios		
twoway ///
    (line cyc_pib tiempo, lcolor(navy) lwidth(medthick)) ///
    (line cyc_m  tiempo, lcolor(red)  lpattern(dash)), ///
    title("Componente Cíclico: PIB y Importaciones") ///
    subtitle("Filtro Hodrick-Prescott (λ=1600)") ///
    ytitle("Desviación log de tendencia") xtitle("Trimestre") ///
    legend(label(1 "PIB") label(2 "Importaciones"))		

*editar el resto en editor
graph combine "consumototal" "inversion" "gobierno", ///
    cols(3) rows(1)	ycommon  title("Componente Cíclico: PIB, Consumo, Inversión y Gobierno") ///
    subtitle("Filtro Hodrick-Prescott (λ=1600)") 
	
	

	
	
*===========================================================
* PREPARACIÓN: bandas de recesión (múltiples períodos)
*===========================================================
gen ceroline = 0
gen bandmax  = .12
gen bandmin  = -.25

* Crisis Asiática (1999)
gen rec1_max = bandmax if tiempo>=tq(1999q1) & tiempo<=tq(1999q4)
gen rec1_min = bandmin if tiempo>=tq(1999q1) & tiempo<=tq(1999q4)

* Crisis Subprime (2009)
gen rec2_max = bandmax if tiempo>=tq(2009q1) & tiempo<=tq(2009q3)
gen rec2_min = bandmin if tiempo>=tq(2009q1) & tiempo<=tq(2009q3)

* COVID (2020)
gen rec3_max = bandmax if tiempo>=tq(2020q1) & tiempo<=tq(2020q3)
gen rec3_min = bandmin if tiempo>=tq(2020q1) & tiempo<=tq(2020q3)

*===========================================================
* VERSIÓN LIGHT MODE
*===========================================================
twoway ///
    (rarea rec1_max rec1_min tiempo, color(gs14%40) lwidth(none)) ///
    (rarea rec2_max rec2_min tiempo, color(gs14%40) lwidth(none)) ///
    (rarea rec3_max rec3_min tiempo, color(gs14%40) lwidth(none)) ///
    (line ceroline tiempo, lcolor(gs10) lwidth(thin) lpattern(solid)) ///
    (line cyc_pib tiempo, lcolor("27 54 93") lwidth(medthick)) ///
    (line cyc_ct  tiempo, lcolor("178 108 122") lwidth(medthick) lpattern(shortdash)), ///
    title("Componente Cíclico: PIB y Consumo Total", size(medlarge) color("27 54 93")) ///
    subtitle("Filtro Hodrick-Prescott ({&lambda}=1600)", size(medsmall) color(gs8)) ///
    ytitle("Desviación log de tendencia", size(small)) ///
    xtitle("Trimestre", size(small)) ///
    ylabel(-.25(.05).1, format(%3.2f) angle(horizontal) glcolor(gs14) glwidth(vthin) grid labsize(small)) ///
    xlabel(`=tq(1996q1)'(20)`=tq(2026q1)', nogrid labsize(small)) ///
    legend(order(5 "PIB" 6 "Consumo Total") pos(7) ring(0) col(1) ///
        region(lcolor(none) fcolor(white%75)) size(small)) ///
    graphregion(color(white) margin(medium)) ///
    plotregion(color(white) lcolor(none)) ///
    note("Fuente: Banco Central de Chile · Gráfico: Juan Enrique Miguieles" ///
         "Zonas sombreadas: Crisis Asiática (1999), Subprime (2009), COVID-19 (2020)", ///
         size(vsmall) color(gs8))

graph export "consumototal_light.png", width(2000) replace

*===========================================================
* VERSIÓN DARK MODE
*===========================================================
twoway ///
    (rarea rec1_max rec1_min tiempo, color(gs6%40) lwidth(none)) ///
    (rarea rec2_max rec2_min tiempo, color(gs6%40) lwidth(none)) ///
    (rarea rec3_max rec3_min tiempo, color(gs6%40) lwidth(none)) ///
    (line ceroline tiempo, lcolor(gs10) lwidth(thin) lpattern(solid)) ///
    (line cyc_pib tiempo, lcolor("173 216 255") lwidth(medthick)) ///
    (line cyc_ct  tiempo, lcolor("230 180 190") lwidth(medthick) lpattern(shortdash)), ///
    title("Componente Cíclico: PIB y Consumo Total", size(medlarge) color(white)) ///
    subtitle("Filtro Hodrick-Prescott ({&lambda}=1600)", size(medsmall) color(gs12)) ///
    ytitle("Desviación log de tendencia", size(small) color(white)) ///
    xtitle("Trimestre", size(small) color(white)) ///
    ylabel(-.25(.05).1, format(%3.2f) angle(horizontal) labcolor(white) glcolor(gs5) glwidth(vthin) grid labsize(small)) ///
    xlabel(`=tq(1996q1)'(20)`=tq(2026q1)', labsize(small) labcolor(white)) ///
    legend(order(5 "PIB" 6 "Consumo Total") pos(7) ring(0) col(1) ///
        region(lcolor(none) fcolor(black%75)) size(small) ) ///
    graphregion(color("20 20 24") margin(medium)) ///
    plotregion(color("20 20 24") lcolor(none)) ///
    note("Fuente: Banco Central de Chile · Elaboración propia (chiledatos)" ///
         "Zonas sombreadas: Crisis Asiática (1999), Subprime (2009), COVID-19 (2020)", ///
         size(vsmall) color(gs10))

graph export "consumototal_dark.png", width(2000) replace
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	