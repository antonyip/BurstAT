# FunctionEx
Simple contract that shows how to use function calls. It runs only one time (no PCS for new transactions). Values can be pushed into user stack, then `JSR` (Jump SubRoutine or JMP_SUB in ciyam docs) is used. Return values can be  sent thru user stack then popped to set any variable. A and B super registers (256 bit) could also be used to send or return values, but the code must be changed to use `FUN set_A1` or `FUN get_A1` instead `PSH` and `POP`. You got it!

## Smart Contract source code
```
^comment Contract Name: FunctionEx
^comment Author: Rui Deleterium
^comment License: GPL-3.0


^declare A
^declare B
SET @A #2222222222222222
SET @B #3333333333333333

^comment could be impl. as "FUN @A :FunAdd $B" or "@A = FunAdd( $B )"
PSH $B
JSR :FunAdd
POP @A

End:
FIN

^comment @addr1 = FunAdd( $addr2 )
FunAdd:
^declare i
POP @i
INC @i
PSH $i
RET

```
