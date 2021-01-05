% horario(Path,Trip,List_of_Time)
horario(38,459,[34080,34200]).
horario(3,31,[37800,38280,38580,38880,39420]).
horario(1,63,[39600,40140,40440,40740,41220]).
horario(3,33,[41400,41880,42180,42480,43020]).
horario(1,65,[43200,43740,44040,44340,44820]).
horario(3,35,[45000,45480,45780,46080,46620]).
horario(1,67,[46800,47340,47640,47940,48420]).
horario(3,37,[48600,49080,49380,49680,50220]).
horario(1,69,[50400,50940,51240,51540,52020]).
horario(3,39,[52200,52680,52980,53280,53820]).
horario(1,71,[54000,54540,54840,55140,55620]).
horario(3,41,[55800,56280,56580,56880,57420]).
horario(1,73,[57600,58140,58440,58740,59220]).
horario(3,43,[59400,59880,60180,60480,61020]).
horario(1,75,[61200,61740,62040,62340,62820]).
horario(3,45,[63000,63480,63780,64080,64620]).
horario(1,77,[64800,65340,65640,65940,66420]).
horario(3,48,[66600,67080,67380,67680,68220]).
horario(1,82,[68400,68940,69240,69540,70020]).
horario(3,52,[70200,70680,70980,71280,71820]).
horario(1,86,[72000,72540,72840,73140,73620]).
horario(3,56,[73800,74280,74580,74880,75420]).
horario(1,432,[75600,76140,76440,76740,77220]).
horario(39,460,[77220,77340]).

% workblock(WorkBlock, List_of_Trips, StartTime, EndTime)
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

% vehicleduty(VehicleDuty, List_of_WorkBlocks)
vehicleduty(12,[12,211,212,213,214,215,216,217,218,219,220,221,222]).

lista_motoristas_nworkblocks(12,[(276,2),(5188,3),(16690,2),(18107,6)]).

% parameteriza��o
geracoes(5).
populacao(4).
prob_cruzamento(0.4).
prob_mutacao(0.5).
nrWorkBlock(5).
target(50).
tempo(4).
geracoes_repetidas(10).

per_individuo(0.1).
peso_hard_constraint1(10).
peso_hard_constraint2(8).
peso_soft_constraint(1).


%-------------------------------------HTTP Server-------------------------------------%
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_open)).
:- use_module(library(http/http_client)).
:- use_module(library(http/json)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/json_convert)).
:- set_setting(http:cors, [*]).

server:-http_server(http_dispatch, [port(2226)]).
server_stop:-http_stop_server(2226,[]).

:- http_handler(root(api), handle_request, []).
:- http_handler(root(api/genetics),inicialize,[]).


inicialize(Request):-
	(
		(
			(option(methods(options),Request),!,
			cors_enable(Request, [methods([post,get,delete])]),
			format("~n"))
		)
		;
		(	
			%read response
			http_read_json(Request,data),
   			%get start time
			get_time(StartTime),
			%process requested data
			process_data_json(data,StartTime),
			%start gera
			gera,
			build_json_response(StartTime,JSON_Response),
			is_json_term(JSON_Response),
			format('Access-Control-Allow-Origin: *~n'),
			format('Content-type: application/json~n'),
			reply_json(JSON_Response)
		)
	).

process_data_json([]):-!.
process_data_json([json([nGenaration=gen,nPopulation=pop,pCrossing=cro,pMutation=mut,nTarget=trg,nStability=sta])|T]):-
	geracoes(gen),
	populacao(pop),
	prob_cruzamento(cro),
	prob_mutacao(mut),
	target(trg),
	geracoes_repetidas(sta).
	process_clients_json(T).

%-------------------------------------HTTP Server-------------------------------------%

% parameteriza��o
inicializa:-write('Numero de novas Geracoes: '),read(NG),
	(retract(geracoes(_));true), asserta(geracoes(NG)),
	write('Dimensao da Populacao: '),read(DP),
	(retract(populacao(_));true), asserta(populacao(DP)),
	write('Probabilidade de Cruzamento (%):'), read(P1),
	PC is P1/100,
	(retract(prob_cruzamento(_));true),	asserta(prob_cruzamento(PC)),
	write('Probabilidade de Mutacao (%):'), read(P2),
	PM is P2/100,
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)),
	write('Avalia��o de Refer�ncia:'), read(P3), (retract(target(_));true), assert(target(P3)),
	write('M�ximo de Tempo que pode demorar:'), read(P4), (retract(tempo(_));true), assert(tempo(P4)),
	write('M�ximo de Gera��es Repetidas:'), read(P5), (retract(geracoes_repetidas(_));true), assert(geracoes_repetidas(P5)).

gera:-
%	inicializa,
	gera_populacao(Pop),
	avalia_populacao(Pop,PopAv),
	retractall(t(_,_,_)),retractall(p(_,_,_)),
	ordena_populacao(PopAv,PopOrd),
	geracoes(NG),!,
	get_time(TempInit),
	gera_geracao(0,TempInit,0,NG,PopOrd).

%cria uma lista com os condutores
gera_condutores(LMaisFinal):-
	lista_motoristas_nworkblocks(_,[(H,Num)|Lista]),
	gera_condutores2(H,Num,Lista,LFinal),random_permutation(LFinal,LMaisFinal),!.

gera_condutores2(_,0,[],[]).

gera_condutores2(H,N,L,[H|LFinal]):-
	N \= 0,
	N1 is N-1,
	gera_condutores2(H,N1,L,LFinal).

gera_condutores2(_,0,[(H,Num)|L],LFinal):-
	gera_condutores2(H,Num,L,LFinal).


gera_populacao(Pop):-
	populacao(TamPop),
	gera_condutores(X),
	length(X,N),
	gera_populacao(TamPop,X,N,Pop).

gera_populacao(0,_,_,[]):-!.

gera_populacao(TamPop,Lista,NumT,[Ind|Resto]):-
	TamPop1 is TamPop-1,
	gera_populacao(TamPop1,Lista,NumT,Resto),
	gera_individuo(Lista,NumT,Ind),
	not(member(Ind,Resto)).
gera_populacao(TamPop,Lista,NumT,L):-
	gera_populacao(TamPop,Lista,NumT,L).

gera_individuo([G],1,[G]):-!.

gera_individuo(Lista,NumT,[G|Resto]):-
	NumTemp is NumT + 1, % To use with random
	random(1,NumTemp,N),
	retira(N,Lista,G,NovaLista),
	NumT1 is NumT-1,
	gera_individuo(NovaLista,NumT1,Resto).

retira(1,[G|Resto],G,Resto).
retira(N,[G1|Resto],G,[G1|Resto1]):-
	N1 is N-1,
	retira(N1,Resto,G,Resto1).

avalia_populacao([],[]).
avalia_populacao([Ind|Resto],[Ind*V|Resto1]):-
	agenda(Ind),
	pausas,
	avalia(V),
	avalia_populacao(Resto,Resto1).

avalia(V1):-
	findall(X,avalia_pausas_refeicoes(X),PPausas),
	findall(Y,avalia_tempos_trabalho(Y),PTrabalhos),
	append(PPausas,PTrabalhos,Pesos),
	somar_lista(Pesos,V1),
	retractall(visitado(_)).

somar_lista([],0):-!.
somar_lista([X|Lista],Soma):-
	somar_lista(Lista,Soma1),
	Soma is Soma1+X.

:-dynamic visitado/1.
avalia_tempos_trabalho(Vf):-
	peso_hard_constraint1(P),
	t(Hi,Hf,I),
	avalia_quatro_horas_seguidas(Hi,Hf,P,V),
	avalia_oito_horas_totais(I,P,V,V2),
	verifica_preferencia_horario(I,V2,Vf).

verifica_preferencia_horario(I,V2,Vf):-
	findall((Hi,Hf),t(Hi,Hf,I),Horarios),
	length(Horarios,L),
	verifica_horario(L,L,Horarios,V3),
	Vf is V2+V3.

%Preferencias: 10h=36000 20h=72000
verifica_horario(0,_,[],0):-!.
verifica_horario(L,C,[(Hi,_)|Horarios],V):-
	peso_soft_constraint(P),
	L==C,
	L1 is L-1,
	verifica_horario(L1,C,Horarios,Vf),
	((Hi<36000, V is Vf+(36000-Hi)*P);V is Vf),!.
verifica_horario(1,_,[(_,Hf)],V):-
	peso_soft_constraint(P),
	verifica_horario(0,_,[],Vf),
	((Hf>72000, V is Vf+(Hf-72000)*P);V is Vf),!.

verifica_horario(L,C,[_|Horarios],V):-
	L1 is L-1,
	verifica_horario(L1,C,Horarios,V).


avalia_oito_horas_totais(I,P,V,Vf):-
	%verifica se j� avaliou o motorista I
	findall(X,visitado(X),Visitados),
	\+member(I,Visitados),
	findall((Hi,Hf),t(Hi,Hf,I),Horarios),
	soma_horarios(Horarios,S),
	%8h=28800
	S>28800,
	Vf is V+(S-28800)*P,
	assert(visitado(I)),!.
avalia_oito_horas_totais(_,_,V,V).


soma_horarios([],0):-!.
soma_horarios([(Hi,Hf)|Horarios],S):-
	soma_horarios(Horarios,S1),
	S is S1+(Hf-Hi).

%4h=14400
avalia_quatro_horas_seguidas(Hi,Hf,P,V):-
	Hf-Hi>14400,
	V is ((Hf-Hi)-14400)*P,!.
avalia_quatro_horas_seguidas(_,_,_,0).

avalia_pausas_refeicoes(V2):-
	p(Hi,Hf,_),
	%11h=39600 15h=54000
	pausa_refeicao(39600,54000,Hi,Hf,0,V1),
	%18h=64800 22h=79200
	pausa_refeicao(64800,79200,Hi,Hf,V1,V2).

pausa_refeicao(Refi,Reff,Hi,Hf,V,Vf):-
	%1h=3600
	peso_hard_constraint2(P),
	%quando a pausa comeca antes da referencia inicial e acaba entre as ambas
	(((Hi<Refi, Hf>Refi), ((Hf-Refi>=3600,Vf is 0); Vf is V+(Hf-Refi)*P,!));

	%quando a pausa esta entre as duas referencias
	((Hi>Refi, Hf<Reff), ((Hf-Hi>=3600,Vf is 0); Vf is V+(Hf-Hi)*P,!));

	%quando a pausa comeca entre as referencias e acaba depois da final
	((Hi<Reff, Hf>Reff), ((Reff-Hi>=3600,Vf is 0); Vf is V+(Reff-Hi)*P,!))),!.
pausa_refeicao(_,_,_,_,V,V).


:-dynamic p/3.
pausas:-
	t(_,Tf,I),!,
	pausa(Tf,I).

pausa(Tf1,I):-
	t(Tf1,Tf2,I2),
	(percorre(Tf2,I,Tf1);true),
	(pausa(Tf2,I2);true).

percorre(Tf,I,Tfi):-
	t(Tf,_,I2),
	I2==I,
	assert(p(Tfi,Tf,I)),!.
percorre(Tf,I,Tfi):-
	t(Tf,Tf2,_),
	percorre(Tf2,I,Tfi).


agenda(Ind):-
	vehicleduty(_,WorkBlocks),
	length(Ind,L),
	agenda2(L,WorkBlocks,Ind,Agenda),
	length(Agenda,LA),
	agenda3(LA,Agenda,0).

agenda2(0,_,_,[]):-!.
agenda2(L,[W|WorkBlocks],[I|Ind],[(HInicio,HFim,I)|Agenda]):-
	workblock(W,_,HInicio,HFim),
	L1 is L-1,
	agenda2(L1,WorkBlocks,Ind,Agenda).

:-dynamic t/3.
agenda3(0,_,_):-!.
agenda3(LA,[(Hi,Hf,I)|Agenda],I2):-
	t(Hi2,Hi,I2),
	I==I2,
	retract(t(Hi2,_,I)),!,
	assert(t(Hi2,Hf,I)),
	L is LA-1,
	agenda3(L,Agenda,I).

agenda3(LA,[(Hi,Hf,I)|Agenda],_):-
	assert(t(Hi,Hf,I)),
	L is LA-1,
	agenda3(L,Agenda,I).



ordena_populacao(PopAv,PopAvOrd):-
	bsort(PopAv,PopAvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
	bsort(Xs,Zs),
	btroca([X|Zs],Ys).


btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
	VX>VY,!,
	btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).

gera_geracao(G,_,_,G,Pop):-!,
	write('Gera��o '), write(G), write(':'), nl, write(Pop), nl.

gera_geracao(G,_,N,_,Pop):-
	write('Gera��o '), write(G), write(':'), nl, write(Pop), nl,
	geracoes_repetidas(GR),
	GR==N,
	write('Estabilizacao de geracoes('),write(N),write(')'), nl,!.


gera_geracao(_,TempInit,_,_,_):-
	tempo(Var),
	get_time(TempoAtual),TempoAtual-TempInit > Var,
	write('TEMPO: '), write(TempInit),nl, write('ATUAL: '),write(TempoAtual), nl, write('Paragem por tempo limite('),write(Var),write(')'), nl,!.

gera_geracao(_,_,_,_,[_*V|_]):-
	target(Z),
	write(Z),write('<='),write(V),nl,
	Z >= V,write('Paragem por valor menor ou igual que o Target('),write(Z),write(')'),!.

gera_geracao(N,TempInit,Count,G,Pop):-
	write('Gera��o '), write(N), write(':'), nl, write(Pop), nl,

	%aleatoridade dos individuos da lista
	random_permutation(Pop,RPop),

	cruzamento(RPop,NPop1),
	mutacao(NPop1,NPop),
	avalia_populacao(NPop,NPopAv),
	ordena_populacao(NPopAv,NPopOrd),
	%write('filhos='),write(NPopOrd),nl,nl,

	%junta as duas gera��es
	append(Pop,NPopOrd,PopTotal),
	ordena_populacao(PopTotal,OrdPopTotal),

	populacao(NG),
	%fun��o que vai buscar a primeira melhor resposta e adiciona os restantes(10% de hip�teses)
	obter_individuos(NG,OrdPopTotal,MPopTotal,PopMaSorte),

	%preenche o resto da lista se faltarem elementos
	length(MPopTotal,T),
	preencher_lista(T,MPopTotal,PopMaSorte,PopFinal),
	(   ( PopFinal == Pop ,Count1 is Count+1 )
	;
	(  PopFinal \== Pop , Count1 is 0)),nl,
	write('Repetidos: '),write(Count1),nl,

	ordena_populacao(PopFinal, PopMaisQueFinal),
	N1 is N+1,
	gera_geracao(N1,TempInit,Count1,G,PopMaisQueFinal).

obter_individuos(NG,[H|NPopOrd],[H|MPopOrd],PopMaSorte):-
	NG1 is NG-1,
	nao_elitista(NG1,NPopOrd,MPopOrd,H,PopMaSorte).

nao_elitista(0,_,[],_,[]):-!.
nao_elitista(NG,[H|NPopOrd],[H|MPopOrd],T,PopMaSorte):-
	random(0.0,1.0,N),
	per_individuo(P),
	N<P,
	H\==T,
	NG1 is NG-1,
        nao_elitista(NG1,NPopOrd,MPopOrd,T,PopMaSorte),
	\+member(H,MPopOrd),!.
nao_elitista(NG,[H|NPopOrd],MPopOrd,_0,[H|PopMaSorte]):-
	NG1 is NG-1,
	nao_elitista(NG1,NPopOrd,MPopOrd,_,PopMaSorte),!.

preencher_lista(Tlista,PopSorte,PopSorte,_):-
	populacao(P),
	Tlista==P,!.
preencher_lista(_,MPopTotal,PopMaSorte,PopFinal):-
	append(MPopTotal,PopMaSorte,PopFinal).

gerar_pontos_cruzamento(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
	nrWorkBlock(N),
	NTemp is N+1,
	random(1,NTemp,P11),
	random(1,NTemp,P21),
	P11\==P21,!,
	((P11<P21,!,P1=P11,P2=P21);P1=P21,P2=P11).
gerar_pontos_cruzamento1(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).


cruzamento([],[]).
cruzamento([Ind*_],[Ind]).
cruzamento([Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1]):-
	gerar_pontos_cruzamento(P1,P2),
	prob_cruzamento(Pcruz),	random(0.0,1.0,Pc),
	((Pc =< Pcruz,!,
        cruzar(Ind1,Ind2,P1,P2,NInd1),
	  cruzar(Ind2,Ind1,P1,P2,NInd2))
	;
	(NInd1=Ind1,NInd2=Ind2)),
	cruzamento(Resto,Resto1).

preencheh([],[]).

preencheh([_|R1],[h|R2]):-
	preencheh(R1,R2).


sublista(L1,I1,I2,L):-
	I1 < I2,!,
	sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-
	sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!,
	preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!,
	N3 is N2 - 1,
	sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-
	N3 is N1 - 1,
	N4 is N2 - 1,
	sublista1(R1,N3,N4,R2).

rotate_right(L,K,L1):-
	nrWorkBlock(N),
	T is N - K,
	rr(T,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):-
	N1 is N - 1,
	append(R,[X],R1),
	rr(N1,R1,R2).


elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):-
	not(member(X,L)),!,
	elimina(R1,L,R2).

elimina([_|R1],L,R2):-
	elimina(R1,L,R2).

insere([],L,_,_,L):-!.
insere([X|R],L,N,LMot,L2):-
	nrWorkBlock(T),
	((N>T,!,N1 is N mod T);N1 = N),
	nth0(_,LMot,(X,Rep)),
	vezes_repetidas_lista(X,L,RepLista),
	((Rep>RepLista,
	insere1(X,N1,L,L1),
	N2 is N + 1,
	insere(R,L1,N2,RepLista,L2));
	(insere(R,L,N,RepLista,L2))),!.

vezes_repetidas_lista(_,[],0).
vezes_repetidas_lista(X,[X|L],RepLista):-
	vezes_repetidas_lista(X,L,R),
	RepLista is R+1,!.
vezes_repetidas_lista(X,[_|L],RepLista):-
	vezes_repetidas_lista(X,L,RepLista).


insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-
	N1 is N-1,
	insere1(X,N1,L,L1).

cruzar(Ind1,Ind2,P1,P2,NInd11):-
	lista_motoristas_nworkblocks(_,L),
	sublista(Ind1,P1,P2,Sub1),
	nrWorkBlock(NumT),
	R is NumT-P2,
	rotate_right(Ind2,R,Ind21),
	P3 is P2 + 1,
	insere(Ind21,Sub1,P3,L,NInd1),
	eliminah(NInd1,NInd11).


eliminah([],[]).

eliminah([h|R1],R2):-!,
	eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
	eliminah(R1,R2).

mutacao([],[]).
mutacao([Ind|Rest],[NInd|Rest1]):-
	prob_mutacao(Pmut),
	random(0.0,1.0,Pm),
	((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
	mutacao(Rest,Rest1).

mutacao1(Ind,NInd):-
	gerar_pontos_cruzamento(P1,P2),
	mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-
	!, P21 is P2-1,
	mutacao23(G1,P21,Ind,G2,NInd).
mutacao22([G|Ind],P1,P2,[G|NInd]):-
	P11 is P1-1, P21 is P2-1,
	mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
	P1 is P-1,
	mutacao23(G1,P1,Ind,G2,NInd).














