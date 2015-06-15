/*
** basic.vert for vvgl in /home/aracthor/programs/projects/vvgl/tests
** 
** Made by aracthor
** Login   <aracthor@epitech.net>
** 
** Started on  Sat Apr 11 23:43:59 2015 aracthor
** Last Update Fri May  1 19:08:34 2015 aracthor
*/

attribute vec3	aPosition;
attribute vec4	aColor;
attribute vec2	aTextureCoord;
attribute vec3	aNormal;

uniform mat4	uModelMatrix;
uniform mat4	uViewMatrix;
uniform mat4	uPerspectiveMatrix;
uniform mat3	uNormalMatrix;

varying vec3	vPosition;
varying vec4	vColor;
varying vec2	vTextureCoord;
varying vec3	vNormal;

void	main(void)
{
  vPosition = (uModelMatrix * vec4(aPosition, 1.0)).xyz;
  gl_Position = uPerspectiveMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1.0);
  vColor = aColor;
  vTextureCoord = aTextureCoord;
  vNormal = normalize(aNormal * uNormalMatrix);
}
