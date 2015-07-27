## Custom Fonts in Windows 8 Store Apps

<time datetime="2013-09-13">13th September 2013</time>

I was <del>attempting to use</del> pulling my hair out over custom fonts in a Windows 8 Store app last weekend. I must have spent around 3 or 4 hours trying to render a TrueType font, and a number of thoughts as to why it didn’t work circled my mind: Is the file path correct? Is the font file invalid? Is there an issue with the framework?

As a last resort, I used an OpenType font. Interestingly, it worked straight away. This, as well as Microsoft’s [documentation](http://msdn.microsoft.com/en-US/bb688099#W8), could suggest that OpenType is the best font format to use with the framework:

> For XAML, advanced OpenType capabilities that were supported in WPF and Silverlight are also supported in the Windows Runtime XAML framework.

However, I have seen various examples of developers successfully embedding TrueType fonts. Therefore, my assumption is that TrueType fonts aren’t fully supported by Windows 8 Store apps. More experienced developers: would you care to agree?

Anyway, my app has a `ResourceDictionary` which contains the below style. I have removed the leading slash from the path as my views are stored in the app’s start up project, which additionally contains the common assets (thanks COM):

```
<Style x:Key=“BaseFont”
           TargetType=“TextBlock”>
    <Setter Property=“FontFamily”
                Value=“Assets/Quicksand_Book.otf#Quicksand” />
    <Setter Property=“Foreground”
                Value=“Black” />
</Style>
```
 
This can then be inherited using the `BasedOn` attribute. Although my styles need further refactoring, this ensures that all text styles are updated when the app’s font is changed:
 
```
<Style x:Key=“PostUsername”
           TargetType=“TextBlock”
           BasedOn=“{StaticResource BaseFont}”>
    <Setter Property=“FontSize”
                Value=“18” />
</Style>
```

The styles can be used via the `StaticResource` markup extension:

```
<TextBlock Text=“{Binding Username}”
                  Style=“{StaticResource PostUsername}”
                  Grid.Row=“2”
                  Grid.Column=“0”
                  HorizontalAlignment=“Center” />
```