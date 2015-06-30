/*
** basic.frag for vvgl in /home/aracthor/programs/projects/vvgl/tests
** 
** Made by aracthor
** Login   <aracthor@epitech.net>
** 
** Started on  Sat Apr 11 23:45:29 2015 aracthor
** Last Update Wed Jun 10 16:45:46 2015 Aracthor
*/

precision mediump float;

struct AmbianceLight
{
  vec3	color;
};

struct DirectionLight
{
  vec3	color;
  vec3	direction;
};

struct SpotLight
{
  float	power;
  vec3	position;
  vec3	color;
};

varying vec3	vPosition;
varying vec4	vColor;
varying vec2	vTextureCoord;
varying vec3	vNormal;

uniform bool		uUseColor;
uniform bool		uUseTexture;
uniform bool		uUseNormal;
uniform sampler2D	uTexture;

uniform AmbianceLight	aLight;
uniform DirectionLight	dLight;
uniform SpotLight	sLight;

vec3	calcLightValue(SpotLight light)
{
  vec3	direction;
  vec3	lighting;
  float	coef;

  direction = light.position - vPosition;
  coef = max(dot(vNormal, normalize(direction)), 0.0) * light.power / length(direction);
  lighting = light.color * coef;

  return (lighting);
}

void	main(void)
{
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);

  if (uUseColor)
    {
      gl_FragColor *= vColor;
    }
  if (uUseTexture)
    {
      gl_FragColor *= texture2D(uTexture, vec2(vTextureCoord.s, vTextureCoord.t));
    }
  if (uUseNormal)
    {
      vec3	lighting;
      lighting = aLight.color;
      lighting += calcLightValue(sLight);
      gl_FragColor *= vec4(lighting, 1.0);
    }
}
