import numpy as np
G=6.674e-11; R=6.371e6; rho=5514
a=(4/3*np.pi)**(1/3)*R; h=a/2; n=120; c=a/n
u=(np.arange(n)+.5)*c-h; X,Y,Z=np.meshgrid(u,u,u,indexing='ij'); X=X.ravel();Y=Y.ravel();Z=Z.ravel(); m=rho*c**3
def pot(p): return -G*m*np.sum(1/np.sqrt((X-p[0])**2+(Y-p[1])**2+(Z-p[2])**2))
def g(p,e=20e3):
    p=np.array(p,float); return np.array([-(pot(p+e*np.eye(3)[d])-pot(p-e*np.eye(3)[d]))/(2*e) for d in range(3)])
off=1.5*c
M=rho*a**3; print('side',a/1e3,'sphere g',G*M/R**2, 'off km',off/1e3)
P0=pot((0,0,h+off)); g0=np.linalg.norm(g((0,0,h+off))); print('face g',g0)
for nm,p in [('mid to edge',(0,h/2,h+off)),('edge',(0,h+off/1.414,h+off/1.414)),('near edge on face',(0,.95*h,h+off)),('corner',(h+off/1.73,h+off/1.73,h+off/1.73)),('near corner',(.95*h,.95*h,h+off))]:
    gg=g(p); ang=np.degrees(np.arccos(abs(gg[2])/np.linalg.norm(gg)))
    print(nm,'g',round(np.linalg.norm(gg),2),'tilt',round(ang,1),'dPhi/g0 km',round((pot(p)-P0)/g0/1e3))
for f in np.linspace(0,.95,20):
    p=(0,f*h,h+off); gg=g(p); print('edge-path',round(f,2),round(np.degrees(np.arccos(abs(gg[2])/np.linalg.norm(gg))),1),round((pot(p)-P0)/g0/1e3,1))
# ocean lens: dPhi along a diagonal and edge directions, then volume
rs=np.linspace(0,.5*h,26); H1=[];H2=[]
for r in rs:
    H1.append((pot((0,r,h+off))-P0)/g0); H2.append((pot((r/2**.5,r/2**.5,h+off))-P0)/g0)
H=(np.array(H1)+np.array(H2))/2
V=1.335e18/6
for L in np.linspace(50e3,120e3,71):
    d=np.clip(L-H,0,None); vol=np.trapezoid(2*np.pi*rs*d,rs)
    if vol>=V: 
        r0=np.interp(0,-(L-H),rs); print('depth km',L/1e3,'radius km',r0/1e3); 
        for dz in [2e3,5e3,8e3]: print(' land at +%dkm: r'%(dz/1e3), np.interp(-(L+dz),-H,rs)/1e3)
        break
