
% tarefa(Id,TempoProcessamento,DataEntrega,Penalizacao).
tarefa(t1,2,5,1).
tarefa(t2,4,7,6).
tarefa(t3,1,11,2).
tarefa(t4,3,9,3).
tarefa(t5,3,8,2).

% parameterização
geracoes(300).
populacao(3).
prob_cruzamento(0.4).
prob_mutacao(0.5).
tarefas(5).
target(9).
tempo(80).
geracoes_repetidas(50000000).

per_individuo(0.1).

% parameterização
inicializa:-write('Numero de novas Geracoes: '),read(NG),
	(retract(geracoes(_));true), asserta(geracoes(NG)),
	write('Dimensao da Populacao: '),read(DP),
	(retract(populacao(_));true), asserta(populacao(DP)),
	write('Probabilidade de Cruzamento (%):'), read(P1),
	PC is P1/100,
	(retract(prob_cruzamento(_));true),	asserta(prob_cruzamento(PC)),
	write('Probabilidade de Mutacao (%):'), read(P2),
	PM is P2/100,
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)).

gera:-
%	inicializa,
	gera_populacao(Pop),
	avalia_populacao(Pop,PopAv),
	ordena_populacao(PopAv,PopOrd),
	geracoes(NG),!,
	get_time(TempInit),
	gera_geracao(0,TempInit,0,NG,PopOrd).

gera_populacao(Pop):-
	populacao(TamPop),
	tarefas(NumT),
	findall(Tarefa,tarefa(Tarefa,_,_,_),ListaTarefas),
	gera_populacao(TamPop,ListaTarefas,NumT,Pop).

gera_populacao(0,_,_,[]):-!.

gera_populacao(TamPop,ListaTarefas,NumT,[Ind|Resto]):-
	TamPop1 is TamPop-1,
	gera_populacao(TamPop1,ListaTarefas,NumT,Resto),
	gera_individuo(ListaTarefas,NumT,Ind),
	not(member(Ind,Resto)).
gera_populacao(TamPop,ListaTarefas,NumT,L):-
	gera_populacao(TamPop,ListaTarefas,NumT,L).

gera_individuo([G],1,[G]):-!.

gera_individuo(ListaTarefas,NumT,[G|Resto]):-
	NumTemp is NumT + 1, % To use with random
	random(1,NumTemp,N),
	retira(N,ListaTarefas,G,NovaLista),
	NumT1 is NumT-1,
	gera_individuo(NovaLista,NumT1,Resto).

retira(1,[G|Resto],G,Resto).
retira(N,[G1|Resto],G,[G1|Resto1]):-
	N1 is N-1,
	retira(N1,Resto,G,Resto1).

avalia_populacao([],[]).
avalia_populacao([Ind|Resto],[Ind*V|Resto1]):-
	avalia(Ind,V),
	avalia_populacao(Resto,Resto1).

avalia(Seq,V):-
	avalia(Seq,0,V).

avalia([],_,0).
avalia([T|Resto],Inst,V):-
	tarefa(T,Dur,Prazo,Pen),
	InstFim is Inst+Dur,
	avalia(Resto,InstFim,VResto),
	(
	(InstFim =< Prazo,!, VT is 0)
	;
	(VT is (InstFim-Prazo)*Pen)
	),
	V is VT+VResto.

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
	write('Geração '), write(G), write(':'), nl, write(Pop), nl.

gera_geracao(G,_,N,_,Pop):-
	write('Geração '), write(G), write(':'), nl, write(Pop), nl,
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
	write('Geração '), write(N), write(':'), nl, write(Pop), nl,

	%aleatoridade dos individuos da lista
	random_permutation(Pop,RPop),
	cruzamento(RPop,NPop1),
	mutacao(NPop1,NPop),
	avalia_populacao(NPop,NPopAv),
	ordena_populacao(NPopAv,NPopOrd),
	%write('filhos='),write(NPopOrd),nl,nl,

	%junta as duas gerações
	append(Pop,NPopOrd,PopTotal),
	ordena_populacao(PopTotal,OrdPopTotal),

	populacao(NG),
	%função que vai buscar a primeira melhor resposta e adiciona os restantes(10% de hipóteses)
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


preenche(0,_,PopSorte,PopSorte):-!.
preenche(N,[H|OrdPopTotal],PopSorte,PopFinal):-
	\+member(H,PopSorte),
	N1 is N-1,
	preenche(N1,OrdPopTotal,[H|PopSorte],PopFinal),!.
preenche(N,[_|OrdPopTotal],PopSorte,PopFinal):-
	preenche(N,OrdPopTotal,PopSorte,PopFinal).


gerar_pontos_cruzamento(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
	tarefas(N),
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
	tarefas(N),
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

insere([],L,_,L):-!.
insere([X|R],L,N,L2):-
	tarefas(T),
	((N>T,!,N1 is N mod T);N1 = N),
	insere1(X,N1,L,L1),
	N2 is N + 1,
	insere(R,L1,N2,L2).


insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-
	N1 is N-1,
	insere1(X,N1,L,L1).

cruzar(Ind1,Ind2,P1,P2,NInd11):-
	sublista(Ind1,P1,P2,Sub1),
	tarefas(NumT),
	R is NumT-P2,
	rotate_right(Ind2,R,Ind21),
	elimina(Ind21,Sub1,Sub2),
	P3 is P2 + 1,
	insere(Sub2,Sub1,P3,NInd1),
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














