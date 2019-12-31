Attribute VB_Name = "Module1"
Sub Writedown()
    Call Test(3, ThisWorkbook.Path & "\string_ja.json")
    Call Test(4, ThisWorkbook.Path & "\string_en.json")
End Sub


Sub Test(i As Integer, file As String)
    Dim index As Integer
    Dim filePath As String
    
    Dim arr() As Variant
    Dim firstFlg As Boolean
    Dim textStream As Object
    
    '���ڃC���f�b�N�X
    index = i
    
    '�t�@�C���p�X
    filePath = file
    
    '�Z���͈͂��擾
    arr = Range("A1").CurrentRegion.Value
    
    '�������ڃt���O��True��ݒ肷��B
    firstFlg = True
    
    '�t�@�C�������o���I�u�W�F�N�g�𐶐�����
    Set textStream = CreateObject("ADODB.Stream")
    
    With textStream
        .Open
        .Type = 2
        .Charset = "UTF-8"
        
        '�ŏ��̊���
        .writeText "{", 1
        
        '�s���Ԃ񃋁[�v����
        For x = LBound(arr, 1) + 1 To UBound(arr, 1)
            
            '��1�K�w���ς��ꍇ
            If arr(x, 1) <> "" Then
                '1���ڂł���ꍇ�A�Ȃɂ����Ȃ�
                If firstFlg = True Then
                    firstFlg = False
                '2���ڈȍ~�ł���ꍇ�A�O���ڂ̕����ʂ��쐬����
                Else
                    .writeText "", 1
                    .writeText Chr(9) & "},", 1
                End If
                
                '��1�K�w�̍��ڂ������o��
                .writeText Chr(9) & """" & arr(x, 1) & """: {", 1
            End If
            
            '�e���ڂ������o��
            .writeText Chr(9) & Chr(9) & """" & arr(x, 2) & """: """ & arr(x, index) & """"
            
            '�ŏI���ڂ̏ꍇ�A�u���C�N
            If x = UBound(arr, 1) Then
                Exit For
            End If
            '�ŏI���ڂłȂ��ꍇ�����ɑ�1�K�w�̍��ڂ��Ȃ��ꍇ�A�J���}��t�^���ĉ��s����
            If arr(x + 1, 1) = "" Then
                .writeText ",", 1
            End If
        Next x
        
        '������
        .writeText "", 1
        .writeText Chr(9) & "}", 1
        .writeText "}"
        .SaveToFile filePath, 2
        .Close
    End With

End Sub

