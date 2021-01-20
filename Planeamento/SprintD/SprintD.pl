% workblock(WorkBlock, List_of_Trips,StartTime, EndTime)
workblock(12, [459],   34080, 37620).
workblock(211,[31,63], 37620, 41220).
workblock(212,[33,65], 41220, 44820).
workblock(213,[35,67], 44820, 48420).
workblock(214,[37,69], 48420, 52020).
workblock(215,[39,71], 52020, 55620).
workblock(216,[41,73], 55620, 59220).
workblock(217,[43,75], 59220, 62820).
workblock(218,[45,77], 62820, 66420).
workblock(219,[48,82], 66420, 70020).
workblock(220,[52,86], 70020, 73620).
workblock(221,[56,432],73620, 77220).
workblock(222,[460],   77220, 77340).

%vehicleDuty(Id,WorkBlocks)
vehicleDuty(12,[12,211,212,213,214,215,216,217,218,219,220,221,222]).

%rangevd(VehicleDuty, StartTime, EndTime)
%rangevd(1, 26580,73320).
%rangevd(2, 27300,76440).
%rangevd(3, 27300,77460).
%rangevd(4, 27900,74640).
%rangevd(5, 28200,89940).
%rangevd(6, 28500,75060).
%rangevd(7, 28740,82440).
%rangevd(8, 29100,76020).
%rangevd(9, 29220,75960).
%rangevd(10,29700,76260).
%rangevd(11,30000,77820).
rangevd(12,34080,77340).
%rangevd(13,63780,74640).
%rangevd(14,67800,85920).
%rangevd(15,69600,76920).

% horariomotorista(Driver,WorkStart,WorkEnd,WorkTime,DuracaoBlocosMotorista)
%                         7      17	8	6     2
horariomotorista(276,   25200, 61200, 28800, [21600,7200]).
%horariomotorista(527,   25200, 61200, 28800, [21600,7200]).
%horariomotorista(889,	25200, 61200, 28800, [21600,7200]).
%horariomotorista(1055,  25200, 61200, 28800, [14400,14400]).
%horariomotorista(1461,  25200, 61200, 28800, [14400,14400]).
%horariomotorista(1640,  25200, 61200, 28800, [21600,7200]).
%horariomotorista(2049,  25200, 61200, 28800, [21600,7200]).
%horariomotorista(5188,  33300, 69300, 28800, [7200, 21600]).
%horariomotorista(6616,  33300, 69300, 28800, [14400,14400]).
%horariomotorista(6697,  33300, 69300, 28800, [21600,7200]).
%horariomotorista(11018, 41400, 77400, 28800, [21600,7200]).
%horariomotorista(11692, 41400, 77400, 28800, [21600,7200]).
%horariomotorista(14893, 45000, 81000, 28800, [10800,18000]).
%horariomotorista(16458, 50400, 86400, 28800, [14400,14400]).
%horariomotorista(16690, 50400, 86400, 28800, [7200, 21600]).
%horariomotorista(16763, 50400, 86400, 28800, [14400,14400]).
%horariomotorista(17015, 50400, 86400, 28800, [10800,18000]).
%horariomotorista(17552, 54000, 90000, 28800, [10800,18000]).
%horariomotorista(17623, 25200, 61200, 28800, [21600,7200]).
%horariomotorista(17630, 25200, 61200, 28800, [21600,7200]).
%horariomotorista(17639, 27000, 48600, 21600, [21600]).
%horariomotorista(17673, 25200, 61200, 28800, [21600,7200]).
%horariomotorista(18009, 50400, 86400, 28800, [7200, 21600]).
%horariomotorista(18050, 54000, 90000, 28800, [21600,7200]).
%horariomotorista(18097, 57600, 79200, 21600, [21600]).
%horariomotorista(18105, 57600, 79200, 21600, [21600]).
%horariomotorista(18107, 57600, 79200, 21600, [21600]).
horariomotorista(18119, 59400, 81000, 21600, [21600]).
%horariomotorista(18131, 66600, 88200, 21600, [21600]).


lista_motoristas_nworkblocks(12,[(276,2),(5188,3),(16690,2),(18107,6)]).

%Paramterizacao
nr_vehicle_duties(15).
margem_maxima(0.20).
margem_minima(0.14).

escalonamento():-
	verifica_margem(),
	findall(_,blocos_motorista(),_).

:-dynamic afetacao/3.
afetar_motoristas():-
	nr_vehicle_duties(N),
	afetar(N).

afetar(0):-!.
afetar(N):-
	vd_inicio_crescente([(_,Vd)|V]),
	vehicleDuty(Vd,Wb),
	tuples_inicio_crescente([T1|T]).

maior_workblock(Wb,T):-
	maior_workblock(Wb,0,T).

maior_workblock([],Twb,Twb):-!.
maior_workblock([H|Wb],Twb,Tf):-
	workblock(H,_,St,Et),
	T is Et-St,
	T>Twb,
	maior_workblock(Wb,T,Tf),!.
maior_workblock([_|Wb],Twb,Tf):-
	maior_workblock(Wb,Twb,Tf).

% ListaOrd= [(StartTime,VehicleDuty)|...]
vd_inicio_crescente(ListaOrd):-
	findall((S,V),rangevd(V,S,_),Lista),
	sort(Lista, ListaOrd).

tuples_inicio_crescente(ListaOrd):-
	findall((St,Et,Time,D),t(St,Et,Time,D),Lista),
	sort(Lista,ListaOrd).

%t(StartTime,EndTime,WorkTime,Driver)
:-dynamic t/4.
blocos_motorista():-
	horariomotorista(M,StartTime,EndTime,WorkTime,Blocks),
	T is (EndTime-StartTime)-WorkTime,
	length(Blocks,L),
	T1 is T/L,
	criar_blocos(M,StartTime,EndTime,T1,Blocks,L).

criar_blocos(M,_,EndTime,T,[H|_],1):-
	St is EndTime-H-T,
	assert(t(St,EndTime,H,M)),!.
criar_blocos(M,StartTime,EndTime,T,[H|Blocks],L):-
	Et is StartTime+H+T,
	assert(t(StartTime,Et,H,M)),
	L1 is L-1,
	criar_blocos(M,Et,EndTime,T,Blocks,L1).


verifica_margem():-
	carga_total(Carga),
	capacidade_sistema(Capacidade),
	(Capacidade>Carga,!;
	write('Capacidade menor que a carga'),nl,false),
	margem_maxima(Mmax),
	margem_minima(Mmin),
	M is 1-(Carga/Capacidade),
	(M<Mmax, M>Mmin,!;
	write('Margem entre capacidade e carga não se encontra entre 15% e 20%'),nl,
	false).

capacidade_sistema(CS):-
	findall(X,horariomotorista(_,_,_,X,_),C),
	somar_lista(C,CS).

carga_total(C):-
	findall(X,ranges(X),R),
	somar_lista(R,C).

somar_lista([],0):-!.
somar_lista([H|R],C):-
	somar_lista(R,C1),
	C is  C1 + H.

ranges(R):-
	rangevd(_,S,E),
	R is E-S.
