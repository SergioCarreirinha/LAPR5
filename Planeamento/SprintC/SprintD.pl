% workblock(WorkBlock, List_of_Trips,StartTime, EndTime)
workblock(12,[459],34080,37620).
workblock(211,[31,63],37620,41220).
workblock(212,[33,65],41220,44820).
workblock(213,[35,67],44820,48420).
workblock(214,[37,69],48420,52020).
workblock(215,[39,71],52020,55620).
workblock(216,[41,73],55620,59220).
workblock(217,[43,75],59220,62820).
workblock(218,[45,77],62820,66420).
workblock(219,[48,82],66420,70020).
workblock(220,[52,86],70020,73620).
workblock(221,[56,432],73620,77220).
workblock(222,[460],77220,77340).

lista_motoristas_nworkblocks(12,[(276,2),(5188,3),(16690,2),(18107,6)]).


verifica_carga():-!.

% uma lista com os condutores
gera_condutores(LMaisFinal):-
	lista_motoristas_nworkblocks(_,[(H,Num)|Lista]),
	gera_condutores2(H,Num,Lista,LFinal),
	random_permutation(LFinal,LMaisFinal),
	!.

%Cria uma lista com os condutores
gera_condutores(LMaisFinal):-
	lista_motoristas_nworkblocks(_,[(H,Num)|Lista]),
	gera_condutores2(H,Num,Lista,LFinal),
	random_permutation(LFinal,LMaisFinal),
	!.


gera_condutores2(_,0,[],[]).

gera_condutores2(H,N,L,[H|LFinal]):-
	N \= 0,
	N1 is N-1,
	gera_condutores2(H,N1,L,LFinal).

gera_condutores2(_,0,[(H,Num)|L],LFinal):-
	gera_condutores2(H,Num,L,LFinal).
