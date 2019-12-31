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
    
    '項目インデックス
    index = i
    
    'ファイルパス
    filePath = file
    
    'セル範囲を取得
    arr = Range("A1").CurrentRegion.Value
    
    '初頭項目フラグにTrueを設定する。
    firstFlg = True
    
    'ファイル書き出しオブジェクトを生成する
    Set textStream = CreateObject("ADODB.Stream")
    
    With textStream
        .Open
        .Type = 2
        .Charset = "UTF-8"
        
        '最初の括弧
        .writeText "{", 1
        
        '行数ぶんループする
        For x = LBound(arr, 1) + 1 To UBound(arr, 1)
            
            '第1階層が変わる場合
            If arr(x, 1) <> "" Then
                '1項目である場合、なにもしない
                If firstFlg = True Then
                    firstFlg = False
                '2項目以降である場合、前項目の閉じ括弧を作成する
                Else
                    .writeText "", 1
                    .writeText Chr(9) & "},", 1
                End If
                
                '第1階層の項目を書き出す
                .writeText Chr(9) & """" & arr(x, 1) & """: {", 1
            End If
            
            '各項目を書き出す
            .writeText Chr(9) & Chr(9) & """" & arr(x, 2) & """: """ & arr(x, index) & """"
            
            '最終項目の場合、ブレイク
            If x = UBound(arr, 1) Then
                Exit For
            End If
            '最終項目でない場合かつ次に第1階層の項目がない場合、カンマを付与して改行する
            If arr(x + 1, 1) = "" Then
                .writeText ",", 1
            End If
        Next x
        
        '閉じ括弧
        .writeText "", 1
        .writeText Chr(9) & "}", 1
        .writeText "}"
        .SaveToFile filePath, 2
        .Close
    End With

End Sub

