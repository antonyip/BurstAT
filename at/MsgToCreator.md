# MsgToCreator
This contract uses others examples to create one more complex. Once activated, the contract:
* verifies if transactions is valid
* gets the ammount received
* divides to One burst, so bringing values down (to avoid overflow).
* adds one to value
* converts value in text
* sends message to the creator with the ammount received (plus one!)

Note that ammount held by this contract can never be sent to other address!!!

## Smart Contract source code

```
^comment Contract Name: MsgToCreator
^comment Author: Rui Deleterium
^comment License: GPL-3.0

^declare Oito
^declare Dez
^declare Dezesseis
^declare Quarentaeoito
^declare OneBurst
^declare St_1
^declare St_2
^declare ValidTransaction
^declare ReceivedAmount
^declare LastTransaction
^declare Text
^declare temp

^comment string "aabbccdd1122334 "
SET @St_1 #6464636362626161
SET @St_2 #2034333332323131
SET @OneBurst #0000000005f5e100

SET @Oito #0000000000000008
SET @Dez #000000000000000a
SET @Dezesseis #0000000000000010
SET @Quarentaeoito #0000000000000030

Update:
PCS

FUN A_to_Tx_after_Timestamp $LastTransaction
FUN @ValidTransaction check_A_Is_Zero
BZR $ValidTransaction :End
FUN @LastTransaction get_Timestamp_for_Tx_in_A
FUN @ReceivedAmount get_Amount_for_Tx_in_A

DIV @ReceivedAmount $OneBurst

PSH $ReceivedAmount
JSR :FunAdd
POP @ReceivedAmount

PSH $ReceivedAmount
JSR :itoa
POP @Text

FUN set_A1 $St_1
FUN set_A2 $St_2
FUN set_A3 $Text
FUN B_to_Address_of_Creator
FUN send_A_to_Address_in_B
JMP :Update

End:
FIN


^comment @addr1 = FunAdd( $addr2 )
FunAdd:
^declare ret
POP @ret
INC @ret
PSH $ret
RET

^comment @addr1 = itoa( $addr2 )
itoa:
^declare val
^declare temp
^declare ret
POP @val
BNZ $val :itoa_next
SET @ret $Quarentaeoito
JMP :itoa_return
itoa_next:
CLR @ret

itoa_loop:
BZR $val :itoa_return
SET @temp $val
MOD @temp $Dez

ADD @temp $Quarentaeoito
SHL @ret $Oito
ADD @ret $temp
DIV @val $Dez
JMP :itoa_loop

itoa_return:
PSH $ret
RET
```
